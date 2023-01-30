import time
from voting import Voting
from beaker import sandbox
from beaker.client import ApplicationClient
from beaker.client.api_providers import Network, AlgoNode
from algosdk.atomic_transaction_composer import TransactionWithSigner
from algosdk.future.transaction import AssetTransferTxn
from algosdk.atomic_transaction_composer import AccountTransactionSigner
from beaker import Application, AccountStateValue, opt_in, external, create


client = AlgoNode(Network.TestNet).algod()
# client = sandbox.get_algod_client()

accts = sandbox.get_accounts()

creator_acct = accts.pop()
acct1 = accts.pop()
acct2 = accts.pop()

app=Voting()
app_client = ApplicationClient(client=client, app=app, signer=creator_acct.signer)


def test():
    app_id, app_addr, tx_id = app_client.create()
    print(f"App created with ID: {app_id}, and address: {app_addr} and signed with tx id: {tx_id}")

    acct1_client = app_client.prepare(signer=acct1.signer)
    acct1_client.opt_in()

    acct2_client = app_client.prepare(signer=acct2.signer)
    acct2_client.opt_in()

    app_client.call(app.create_proposal, proposal="Burn Supply?", end_time=120)
    print(app_client.get_application_state())
    print(acct1_client.get_account_state())

    acct1_client.call(app.vote, vote_choice="yes", key="is_staking", app=156323953)
    print(app_client.get_application_state())
    print(acct1_client.get_account_state())

    acct1_client.close_out()
    acct1_client.opt_in()

    print(app_client.get_application_state())
    print(acct1_client.get_account_state())

    acct1_client.call(app.vote, vote_choice="yes", key="is_staking", app=156323953)
    acct2_client.call(app.vote, vote_choice="no", key="is_staking", app=156323953)

    print(acct1_client.get_account_state())
    print(acct2_client.get_account_state())
    print(app_client.get_application_state())

    time.sleep(120)

    result = app_client.call(app.get_vote_result)
    print(result.return_value)
  

test()
