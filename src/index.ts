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
let APPID = 156404418;
let deadline = Number(0);
let prop = String("");

let ASSETID = 156293328;

const buttonIds = ['connect', 'create_app', 'optin_to_contract', 'make_proposal', 'get_proposal', 'propose_yes', 'propose_no'];

// end_time, description, 'yes_voters', 'no_voters', proposal_description, proposal_end_time
const buttons: {[key: string]: HTMLButtonElement} = {};
const accountsMenu = document.getElementById('accounts') as HTMLSelectElement;

let end_time = document.getElementById("end_time") as HTMLInputElement
let description = document.getElementById("description") as HTMLTextAreaElement



buttonIds.forEach(id => {
  buttons[id] = document.getElementById(id) as HTMLButtonElement
})

const truncate = (
  text = "0x0872893278987067858758755028302",
  startChars = 4,
  endChars = 4,
  maxLength = 11
) => {
  if (text.length > maxLength) {
    var start = text.substring(0, startChars);
    var end = text.substring(text.length - endChars, text.length);
    while (start.length + end.length < maxLength) {
      start = start + ".";
    }
    document.getElementById("connect").innerHTML = `${start + end}`;
    return;
  }

  document.getElementById("connect").innerHTML = `${text}`;
};

buttons.connect.onclick = async () => {
  await myAlgo.getAccounts()
  myAlgo.accounts.forEach(account => {
    truncate(account.address)
    accountsMenu.add(new Option(`${account.name} - ${account.address}`, account.address))
    console.log(account);
    console.log(accountsMenu.selectedOptions[0].value)

  })
}

buttons.create_app.onclick = async () => {
  const votingApp = new Voting({
    client: algodClient,
    signer,
    sender: accountsMenu.selectedOptions[0].value,
  });

  const { appId, appAddress, txId } = await votingApp.create();

  document.getElementById('create_app_status').innerHTML = `App created with id: ${appId} and address: ${appAddress} in txId: ${txId}`;

}


buttons.optin_to_contract.onclick = async () => {
  const votingApp = new Voting({
    client: algodClient,
    signer,
    sender: accountsMenu.selectedOptions[0].value,
    appId: APPID
  });

  const result = await votingApp.optIn();
  console.log(result)
}



buttons.make_proposal.onclick = async (e) => {
  e.preventDefault()
  const votingApp = new Voting({
    client: algodClient,
    signer,
    sender: accountsMenu.selectedOptions[0].value,
    appId: APPID
  });
  const result = await votingApp.create_proposal({proposal: String(description.value), end_time: BigInt(end_time.valueAsNumber)});
  console.log(result)


  const proposal = await votingApp.getApplicationState()

  prop = String(proposal["proposal"])
  document.getElementById("proposal_description").innerHTML = `${prop}`;
  
  // let deadline = algosdk.decodeUint64(proposal["end_time"], "safe") / BigInt(86400)
  deadline = Number(proposal["end_time"])
  // console.log(deadline);
  
  document.getElementById("proposal_end_time").innerHTML = `${deadline} seconds`;

  console.log(proposal["proposal"])
  console.log(proposal["end_time"])
}

buttons.get_proposal.onclick = async () => {
  const votingApp = new Voting({
    client: algodClient,
    signer,
    sender: accountsMenu.selectedOptions[0].value,
    appId: APPID
  });

  const result = await votingApp.get_vote_result();
  console.log(result.returnValue)
}


buttons.propose_yes.onclick = async () => {
  const votingApp = new Voting({
    client: algodClient,
    signer,
    sender: accountsMenu.selectedOptions[0].value,
    appId: APPID
  });

  const result = await votingApp.vote({vote_choice: String("yes"), key: String("is_staking"), app: BigInt(stakingAPPID)});
  console.log(result)

  const proposal = await votingApp.getApplicationState()
  let yesVote = proposal["num_of_yays"]
  console.log(yesVote);
  
  document.getElementById("yes_voters").innerHTML = `${yesVote} Yes`;

  console.log(proposal["num_of_yays"])
}

buttons.propose_no.onclick = async () => {
  const votingApp = new Voting({
    client: algodClient,
    signer,
    sender: accountsMenu.selectedOptions[0].value,
    appId: APPID
  });

  const result = await votingApp.vote({vote_choice: String("no"), key: String("is_staking"), app: BigInt(stakingAPPID)});
  console.log(result)

  const proposal = await votingApp.getApplicationState()
  let noVote = proposal["num_of_nays"]
  console.log(noVote);
  
  document.getElementById("no_voters").innerHTML = `${noVote} No`;

  console.log(proposal["num_of_nays"])
}

const getOnchain = async() => {

  console.log('loaded successfully');

  const votingApp = new Voting({
    client: algodClient,
    signer,
    sender: accountsMenu.selectedOptions[0].value,
    appId: APPID
  });

  const proposal = await votingApp.getApplicationState()
  console.log(proposal)
  console.log("")

  prop = String(proposal["proposal"])
  document.getElementById("proposal_description").innerHTML = `${prop}`;
  
  // let deadline = algosdk.decodeUint64(proposal["end_time"], "safe") / BigInt(86400)
  deadline = Number(proposal["end_time"])
  // console.log(deadline);
  
  document.getElementById("proposal_end_time").innerHTML = `${deadline} seconds`;

  console.log(proposal["proposal"])
  console.log(proposal["end_time"])
}

window.onload = (e => {
   getOnchain()
  
})
