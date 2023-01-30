import "./app.css";

import algosdk from "algosdk";

import { MyAlgoSession} from './wallets/myalgo'
import { Voting } from './voting_client';

const myAlgo = new MyAlgoSession();
const algodClient = new algosdk.Algodv2('', "https://node.testnet.algoexplorerapi.io", '');
const indexerClient = new algosdk.Indexer('', "https://algoindexer.testnet.algoexplorerapi.io", '');

async function signer(txns: algosdk.Transaction[]) {
  const sTxns = await myAlgo.signTxns(txns)
  return sTxns.map(s => s.blob)
}

let faucetAPPID = 156293058;
let stakingAPPID = 156323953;

let ASSETID = 156293328;

const buttonIds = ['connect', 'create_app', 'optin_to_contract', 'make_proposal', 'get_proposal', 'yes_voters', 'no_voters', 'proposal_description', 'proposal_end_time', 'propose_yes', 'propose_no'];

const buttons: {[key: string]: HTMLButtonElement} = {};
const accountsMenu = document.getElementById('accounts') as HTMLSelectElement;

let end_time = document.getElementById("end_time") as HTMLInputElement
let description = document.getElementById("description") as HTMLTextAreaElement


// let ASSETID = 156293328;

//truncate wallet address
const truncate = (
  text: string,
  startChars: number,
  endChars: number,
  maxLength: number
): void => {
  if (text.length > maxLength) {
    var start = text.substring(0, startChars);
    var end = text.substring(text.length - endChars, text.length);
    while (start.length + end.length < maxLength) {
      start = start + ".";
    }
    document.getElementById("connect").innerHTML = `${start + end}`;
  } else {
    document.getElementById("connect").innerHTML = `${text}`;
  }
};


buttonIds.forEach(id => {
  buttons[id] = document.getElementById(id) as HTMLButtonElement
})

buttons.connect.onclick = async () => {
  // await myAlgo.getAccounts()
  // myAlgo.accounts.forEach(account => {
  //   accountsMenu.add(new Option(`${account.name} - ${account.address}`, account.address))
  //   console.log(account);

// buttonIds.forEach(id => {
//   buttons[id] = document.getElementById(id) as HTMLButtonElement
// })

// buttons.connect.onclick = async () => {
//   await myAlgo.getAccounts()
//   myAlgo.accounts.forEach(account => {
    //call function to truncate address
   // truncate(account.address, 4, 4, 11);
//     accountsMenu.add(new Option(`${account.name} - ${account.address}`, account.address))
//     console.log(account);

//   })

// }

// buttons.create_app.onclick = async () => {
//   const stakeApp = new Stake({
//     client: algodClient,
//     signer,
//     sender: accountsMenu.selectedOptions[0].value,
//   });

//   const { appId, appAddress, txId } = await stakeApp.create();

//   document.getElementById('create_app_status').innerHTML = `App created with id: ${appId} and address: ${appAddress} in txId: ${txId}`;
//   // fund on dispenser

// }

// buttons.optin_to_asset.onclick = async () => {
//   const stakeApp = new Stake({
//     client: algodClient,
//     signer,
//     sender: accountsMenu.selectedOptions[0].value,
//     appId: APPID
//   });

//   const result = await stakeApp.optin_asset({asset_id: BigInt(156293328)});
//   console.log(result);

// }

// buttons.optin_to_contract.onclick = async () => {
//   const stakeApp = new Stake({
//     client: algodClient,
//     signer,
//     sender: accountsMenu.selectedOptions[0].value,
//     appId: APPID
//   });

//   const result = await stakeApp.optIn();
//   console.log(result)
// }

// buttons.stake.onclick = async () => {
//   const stakeApp = new Stake({
//     client: algodClient,
//     signer,
//     sender: accountsMenu.selectedOptions[0].value,
//     appId: APPID
//   });

//   const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
//     from: accountsMenu.selectedOptions[0].value,
//     to: stakeApp.appAddress,
//     amount: amountInput.valueAsNumber,
//     suggestedParams: await algodClient.getTransactionParams().do(),
//     assetIndex: ASSETID,
//   })
//   const result = await stakeApp.stake({txn:txn, key: String("asset_id"), app: BigInt(faucetAPPID)});
//   console.log(result)
// }

// buttons.unstake.onclick = async () => {
//   const stakeApp = new Stake({
//     client: algodClient,
//     signer,
//     sender: accountsMenu.selectedOptions[0].value,
//     appId: APPID
//   });

//   const result = await stakeApp.unstake({time: BigInt(300), asset_id: BigInt(ASSETID)});
//   console.log(result)
// }
