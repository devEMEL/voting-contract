import time
from voting import Voting
from beaker.client import ApplicationClient
from beaker import sandbox
from beaker.client.api_providers import Network, AlgoNode
from algosdk.atomic_transaction_composer import TransactionWithSigner
from algosdk.future.transaction import AssetTransferTxn
from beaker import Application, AccountStateValue, opt_in, external, create


client = AlgoNode(Network.TestNet).algod()
# client = sandbox.get_algod_client()

accts = sandbox.get_accounts()

creator_acct = accts.pop()
print(creator_acct.address)
acct1 = accts.pop()
print(acct1.address)

app=Voting()
app_client = ApplicationClient(client=client, app=app, signer=creator_acct.signer)


def test():
    app_id, app_addr, tx_id = app_client.create()
    print(f"App created with ID: {app_id}, and address: {app_addr} and signed with tx id: {tx_id}")

    acct1_client = app_client.prepare(signer=acct1.signer)

    # acct1_client.opt_in()

    app_client.call(app.create_proposal, proposal="Mint NFT?", end_time=120)

    print(app_client.get_application_state())

    print(acct1_client.get_account_state())

    acct1_client.call(app.vote, vote_choice="yes", key="is_staking", app=156293058)

    print(app_client.get_application_state())

    print(acct1_client.get_account_state())
  

test()
