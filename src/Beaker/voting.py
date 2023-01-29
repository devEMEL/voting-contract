from pyteal import *
from typing import Final
from beaker import Application, AccountStateValue, ApplicationStateValue, external, opt_in, create, Authorize


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
            self.end_time.set(end_time.get())
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
            If(self.vote_choice == Bytes("yes"))
            .Then(self.num_of_yays + Int(1))
            .ElseIf(self.vote_choice == Bytes("no"))
            .Then(self.num_of_nays + Int(1)),
            self.has_vote.set(Int(1))
        )

    @external
    def get_vote_result(self):
        return Seq(
            Assert(Global.latest_timestamp() > self.end_time),
            If(self.num_of_yays > self.num_of_nays)
            .Then(self.result.set("passed"))
            .ElseIf(self.num_of_yays < self.num_of_nays)
            .Then(self.result.set("failed"))
            .Else(self.result.set("tie"))
        )


Voting().dump()
