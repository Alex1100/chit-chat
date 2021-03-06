const infuraEndpoint = process.env.INFURA_ENDPOINT_MAIN_NETWORK;
const Web3 = require('web3');
const EthTx = require('ethereumjs-tx');
const ethers = require('ethers');
const SHA3 = require('sha3');
const web3 = new Web3(new Web3.providers.HttpProvider(infuraEndpoint));
const axios = require('axios');
const Eth = require('ethjs');
const eth = new Eth(new Eth.HttpProvider(infuraEndpoint));
const User = require('../models/user').User;


const findPrivateKey = async (req, res, next) => {
  try {
    if (req.decoded) {
      const user = User.findOne({where: { username: req.decoded.username } });
      if (!user) {
        throw new Error("Invalid JWT Token");
      }

      const {
        username,
        password
      } = req.body;

      let user_creds = username + password;

      var d = new SHA3.SHA3Hash('256');
      d.update(user_creds);
      const privateKey = `0x${d.digest('hex')}`;
      req.privateKey = privateKey;
      next();
    } else {
      throw new Error('Must pass in credentials');
    }
  } catch (e) {
    console.log("ERROR: ", e);
    res.status(422).send(e);
  }
}


const instantiateEtherWallet = async (req, res, next) => {
  try {
    if (req.body.username, req.body.password) {
    let { username, password } = req.body;
      const user_creds = username + password;

      var d = new SHA3.SHA3Hash('256');
      d.update(user_creds);
      const privateKey = `0x${d.digest('hex')}`;
      const newEtherWallet = new ethers.Wallet(privateKey);
      req.newEtherWallet = newEtherWallet;
      next();
    } else {
      throw new Error('Must pass in credentials');
    }
  } catch (e) {
    console.log("ERROR IS: ", e);
    res.status(422).send(e);
  }
}


const sendEth = async (req, res, next) => {
  try {
    if (req.privateKey) {
      const {
        toAddr,
        fromAddr,
        amount
      } = req.body;

      const currentBalance = await web3.eth.getBalance(fromAddr);
      const currentGasPrice = await web3.eth.getGasPrice();
      const non = await web3.eth.getTransactionCount(fromAddr);

      const rawTx = {
        nonce: non,
        from: fromAddr,
        to: toAddr,
        gas: web3.utils.toHex(21000),
        gasLimit: web3.utils.toHex(90000),
        gasPrice: web3.utils.toHex(100000000000),
        value: web3.utils.toHex(web3.utils.toWei(amount, 'ether')),
        data: ""
      };

      const fromAddrPKey = req.privateKey.slice(2, req.privateKey.length);
      let fromAddrPKeyX = new Buffer(fromAddrPKey, 'hex');

      const tx = new EthTx(rawTx);
      tx.sign(fromAddrPKeyX);

      let serializedTx = `0x${tx.serialize().toString('hex')}`;

      const successTxHash = await eth.sendRawTransaction(serializedTx);

      req.transactionData = {
        transactionChecker: `https://etherscan.io/tx/${successTxHash}`,
        successTxHash,
        from: fromAddr,
        to: toAddr
      }
      next();
    } else {
      throw new Error("PAYMENT DIDN'T GO THROUGH BECAUSE NO PRIVATE KEY FOUND");
    }
  } catch (e) {
    console.log("PAYMENT DIDN'T GO THROUGH: ", e.message);
    return res.status(422).send(e.message);
  }
};



module.exports = {
  sendEth,
  instantiateEtherWallet,
  findPrivateKey
};
