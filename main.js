const BlockChain =  require("./model/BlockChain");
const Block = require("./model/Block");
const Transaction = require("./model/Transaction");
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('425bf7a20c1d4398b109afaed255c96031e33e84ef459ae0db4cd6a1065f96eb')
const myWalletAddress = myKey.getPublic('hex');

let qcoin = new BlockChain();

const tx1 = new Transaction(myWalletAddress, "04c882518af327b7d48307b31abe18d957fc1e58ad0c446ce6f2d9c9f2e78cb47e5660fff10818af0daddb9145d952cc9a1d3a7d539b9f218869cb6a7fe3d8561d", 10);
tx1.signTransaction(myKey);
qcoin.addTransaction(tx1);

qcoin.minePendingTransactions(myWalletAddress);

console.log(qcoin.getBalance(myWalletAddress)); 