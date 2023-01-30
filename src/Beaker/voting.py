from pyteal import *
from typing import Final
from beaker import Application, AccountStateValue, ApplicationStateValue, Authorize, bare_external, external, create, opt_in


class Voting(Application):
    proposal: Final[ApplicationStateValue] = ApplicationStateValue(
        stack_type=TealType.bytes
    )
    start_time: Final[ApplicationStateValue] = ApplicationStateValue(
        stack_type=TealType.uint64
    )
    end_time: Final[ApplicationStateValue] = ApplicationStateValue(
        stack_type=TealType.uint64
    )
    result: Final[ApplicationStateValue] = ApplicationStateValue(
        stack_type=TealType.bytes
    )
    num_of_yays: Final[ApplicationStateValue] = ApplicationStateValue(
        stack_type=TealType.uint64
    )
    num_of_nays: Final[ApplicationStateValue] = ApplicationStateValue(
        stack_type=TealType.uint64
    )
    vote_choice: Final[AccountStateValue] = AccountStateValue(
        stack_type=TealType.bytes
    )
    has_vote: Final[AccountStateValue] = AccountStateValue(
        stack_type=TealType.uint64
    )

    @create
    def create(self):
        return self.initialize_application_state()

    @opt_in
    def optin(self):
        return self.initialize_account_state()

    @external(authorize=Authorize.only(Global.creator_address()))
    def create_proposal(self, proposal: abi.String, end_time: abi.Uint64):
        return Seq(
            self.proposal.set(proposal.get()),
            self.start_time.set(Global.latest_timestamp()),
            self.end_time.set(Global.latest_timestamp() + end_time.get())
            # yes no set
        )

    @external(authorize=Authorize.opted_in(Global.current_application_id()))
    def vote(
        self,
        vote_choice: abi.String,
        key: abi.String,
        app: abi.Application # type: ignore[assignment]
    ):
        return Seq(
            (is_staking := App.localGetEx(account=Txn.sender(), app=app.application_id(), key=key.get())),
            Assert(is_staking.hasValue()),
            Assert(
                And(
                    Global.latest_timestamp() >= self.start_time,
                    Global.latest_timestamp() <= self.end_time
                )
            ),
            Assert(is_staking.value() == Int(1)),
            Assert(self.has_vote == Int(0)),
            If(vote_choice.get() == Bytes("yes"))
            .Then(
                self.vote_choice.set(Bytes("yes")),
                self.num_of_yays.increment()
            )
            .ElseIf(vote_choice.get() == Bytes("no"))
            .Then(
                self.vote_choice.set(Bytes("no")),
                self.num_of_nays.increment()
            ),
            self.has_vote.set(Int(1))
        )

    @external(authorize=Authorize.only(Global.creator_address()))
    def get_vote_result(self, *, output: abi.String):
        return Seq(
            Assert(Global.latest_timestamp() > self.end_time),
            If(self.num_of_yays > self.num_of_nays)
            .Then(self.result.set(Bytes("passed")))
            .ElseIf(self.num_of_yays < self.num_of_nays)
            .Then(self.result.set(Bytes("rejected")))
            .Else(self.result.set(Bytes("undecided"))),
            output.set(self.result)
        )

    @bare_external(close_out=CallConfig.CALL, clear_state=CallConfig.CALL)
    def clear_vote(self):
        return Seq(
            Assert(self.has_vote == Int(1)),
            If(self.vote_choice == Bytes("yes"))
            .Then(
                Assert(self.num_of_yays > Int(0)),
                self.num_of_yays.decrement()
            )
            .ElseIf(self.vote_choice == Bytes("no")).
            Then(
                Assert(self.num_of_nays > Int(0)),
                self.num_of_nays.decrement()
            ),
            self.vote_choice.set(Bytes("")),
            self.has_vote.set(Int(0))
        )


Voting().dump()
