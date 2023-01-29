from pyteal import *
from typing import Final
from beaker import Application, AccountStateValue, ApplicationStateValue, external, opt_in, create, Authorize


class Voting(Application):
  
    

    FEE = Int(1_000)

    @create
    def create(self):
        return self.initialize_application_state()

    @opt_in
    def optin(self):
        return self.initialize_account_state()


Voting().dump()
