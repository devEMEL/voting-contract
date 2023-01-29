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
        stack_type=TealType.uint64
    )
    num_of_yays: Final[ApplicationStateValue] = ApplicationStateValue(
        stack_type=TealType.uint64
    )
    num_of_nays: Final[ApplicationStateValue] = ApplicationStateValue(
        stack_type=TealType.uint64
    )

    @create
    def create(self):
        return self.initialize_application_state()

    @opt_in
    def optin(self):
        return self.initialize_account_state()

    @external(authorize=Authorize.only(Global.creator_address()))
    def create_proposal(self, proposal: abi.String, start_time: abi.Uint64, end_time: abi.Uint64):
        return Seq(

        )


Voting().dump()
