const SHA256 = require("crypto-js/sha256");
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');


class Transaction {
    constructor(fromAddress, toAddress, amount) {
      this.timestamp = Date.now();
      this.fromAddress = fromAddress;
      this.toAddress = toAddress;
      this.amount = amount;
    }

    calculateHash(){
      return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
    }

    signTransaction(signingKey){
      if(signingKey.getPublic('hex') !== this.fromAddress) {
        throw new Error("Cannot sign transactions for other wallet addresses");
      }

      const hashTx = this.calculateHash();
      const sig = signingKey.sign(hashTx, 'base64');
      this.signature = sig.toDER('hex');
    }

    isValid(){
      if(this.fromAddress === null) return true;

      if(!this.signature || this.signature.length === 0){
        throw new Error("Signature is required");
      }

      const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
      return publicKey.verify(this.calculateHash(), this.signature);
    }
  }

module.exports = Transaction;