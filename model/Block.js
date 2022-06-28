const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(timestamp, transactions, prevHash) {
      this.timestamp = timestamp;
      this.transactions = transactions;
      this.prevHash = prevHash;
      this.hash = this.calculateHash();
      this.nonce = 0;
    }
  
    calculateHash() {
      return SHA256(
        this.timestamp +
          this.nonce +
          this.prevHash +
          JSON.stringify(this.transactions)
      ).toString();
    }
  
    mineBlock(difficulty) {
      console.time("mining duration");
      while (!this.hash.startsWith("0".repeat(difficulty))) {
        this.nonce++;
        this.hash = this.calculateHash();
      }
      console.timeEnd("mining duration");
  
      console.log("New Block mined ", this.hash);
    }
  }

  module.exports = Block;