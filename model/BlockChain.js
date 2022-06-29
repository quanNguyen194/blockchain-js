const Block = require("./Block");
const Transaction = require("./Transaction");

class BlockChain {
  constructor() {
    this.chain = [this.genesisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 50;
  }

  genesisBlock() {
    return new Block("19/04/1998", "Genesis Block", "");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(minerAddress) {
    const rewardTx = new Transaction(null, minerAddress, this.miningReward);
    this.pendingTransactions.push(rewardTx);

    let newBlock = new Block(
      Date.now(),
      this.pendingTransactions,
      this.getLatestBlock().hash
    );

    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);

    this.pendingTransactions = [
      new Transaction("null", minerAddress, this.miningReward),
    ];
  }

  addTransaction(transaction) {
    if (transaction.isValid()){
        this.pendingTransactions.push(transaction);
    } else {
        throw new Error("Transaction is invalid");
    }
  }

  getBalance(address) {
    let balance = 0;
    this.chain.forEach((block) => {
      for (const transaction of block.transactions) {
        if (transaction.fromAddress === address) {
          balance -= transaction.amount;
        }

        if (transaction.toAddress === address) {
          balance += transaction.amount;
        }
      }
    });

    return balance;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const prevBlock = this.chain[i - 1];

      if (!currentBlock.hasValidTransactions()) return false;

      if (currentBlock.hash !== currentBlock.calculateHash()) return false;

      if (currentBlock.prevHash !== prevBlock.hash) return false;
    }

    return true;
  }
}

module.exports = BlockChain;
