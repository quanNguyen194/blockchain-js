const BlockChain =  require("./model/BlockChain");
const Block = require("./model/Block");
const Transaction = require("./model/Transaction");

let qcoin = new BlockChain();
qcoin.createTransaction(new Transaction("abc", "quanntm", 100));
qcoin.createTransaction(new Transaction("quanntm", "dieutv3", 10));

qcoin.minePendingTransactions("miner_1");

qcoin.minePendingTransactions("miner_2");

qcoin.chain.forEach(block => {
    console.log(JSON.stringify(block.transactions));
})
console.log(qcoin.getBalance("miner_1"));