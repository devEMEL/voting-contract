import time
from voting import Voting
from beaker.client import ApplicationClient
from beaker import sandbox
from beaker.client.api_providers import Network, AlgoNode
from algosdk.atomic_transaction_composer import TransactionWithSigner
from algosdk.future.transaction import AssetTransferTxn
from beaker import Application, AccountStateValue, opt_in, external, create


## TODO: Test app with interact script

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

  

test()
