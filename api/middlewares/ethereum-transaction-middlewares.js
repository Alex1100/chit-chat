const infuraEndpoint = process.env.OLD_INFURA;
const Web3 = require('web3');
const EthTx = require('ethereumjs-tx');
const ethers = require('ethers');
const SHA3 = require('sha3');
const metamask = require('metamascara')
const web3 = new Web3(new Web3.providers.HttpProvider(infuraEndpoint));
const axios = require('axios');
const Eth = require('ethjs');
const eth = new Eth(new Eth.HttpProvider(infuraEndpoint));
const n = require('nonce')();
let a = n();
const secp256k1 = require('secp256k1');
// const {sign} = require('@warren-bank/ethereumjs-tx-sign')

const findPrivateKey = async (req, res, next) => {
  try {
    if (req.body.password) {
      const {
        username,
        password
      } = req.body;
      let user_creds = username + password;

      var d = new SHA3.SHA3Hash('256');
      d.update(user_creds);
      const privateKey = `0x${d.digest('hex')}`;
      req.privateKey = privateKey;
      console.log("PRIVATE KEY IS: ", req.privateKey);
      next();
    } else {
      throw new Error('Must pass in credentials');
    }
  } catch (e) {
    console.log("ERROR: ", e);
    res.status(422).send(e);
  }
}


const generateNewEtherWallet = async (req, res, next) => {
  try {
    if (req.body.username, req.body.password) {
    let { username, password } = req.body;
      const user_creds = username + password;

      var d = new SHA3.SHA3Hash('256');
      d.update(user_creds);
      const privateKey = `0x${d.digest('hex')}`;
      const newWallet = new ethers.Wallet(privateKey);
      req.newWallet = newWallet;
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

      //ETHEREUM NETWORK IS TOO DAMN CONGESTED...
      //THE GAS PRICES ARE ALMOST ALWAYS NOT ENOUGH
      //FOR THE NETWORK TO RECOGNIZE THE TRANSACTION
      //I AM SENDING 0.02+ ETH AT A TIME, AND STILL
      //NO DICE

      const currentBalance = await web3.eth.getBalance(fromAddr);
      const currentGasPrice = await web3.eth.getGasPrice();

      console.log("GAS PRICE IS: ", currentGasPrice);
      console.log("GAS PRICE X10 IS: ", currentGasPrice * 10);
      console.log(`PROVIDING 120000 GAS`);
      console.log("CURRENT BALANCE IS: ", currentBalance);
      console.log("VALUE IS: ", web3.utils.toWei(amount, 'ether'))
      console.log("INFURA?:::->>>: ", eth);
      let non = await web3.eth.getTransactionCount(fromAddr);

      const rawTx = {
        nonce: a,
        from: fromAddr,
        to: toAddr,
        gas: web3.utils.toHex(21000),
        gasLimit: web3.utils.toHex(1500000000),
        gasPrice: web3.utils.toHex(100000000000),
        value: web3.utils.toHex(web3.utils.toWei(amount, 'ether')),
        data: ""
      };

      const fromAddrPKey = req.privateKey.slice(2, req.privateKey.length);
      let fromAddrPKeyX = new Buffer(fromAddrPKey, 'hex');

      const tx = new EthTx(rawTx);
      tx.sign(fromAddrPKeyX);

      let serializedTx = `0x${tx.serialize().toString('hex')}`;
      //ETHJS NPM MOD FOR SENDING ETH TRANSACTION
      //SUCCINT YET SAME INCONSISTENT RESULTS
      //BECAUSE OF INFURA MAIN NET
      //ethjs SEND RAW TRANSACTION FUNC WORKED ONCE AND NEVER AGAIN :(
       eth.sendRawTransaction(serializedTx)
         .then(successTxHash => {
           console.log("Success Tx Hash Is: ", successTxHash);
           res.status(200).json({transactionChecker: `https://etherscan.io/tx/${successTxHash}`, serializedTx, successTxHash, from: fromAddr, to: toAddr})
         })

      //BLOCK CYPHER API FOR SENDING ETH TRANSACTION
      //A LITTLE MORE CLUTTERED YET SAME INCONSISTENT RESULTS
      //BECAUSE OF INFURA MAIN NET
      // const newTxHash = {
      //   "inputs": [{
      //     "addresses": [fromAddr]
      //   }],
      //   "outputs": [{
      //     "addresses": [toAddr],
      //     "value": Number(web3.utils.toHex(web3.utils.toWei(amount, 'ether')))
      //   }]
      // }

      // axios.post("https://api.blockcypher.com/v1/eth/main/txs/new?token=" + process.env.BLOCK_CYPHER_TOKEN, newTxHash)
      //   .then(txSkeleton => {
      //     console.log("txSkeleton IS: ", txSkeleton.data.tosign[0]);
      //     let zeTx = web3.eth.accounts.sign(txSkeleton.data.tosign[0], fromAddrPKey);
      //     // console.log("AYOOOOOO: ", zeTx);

      //     axios.post("https://api.blockcypher.com/v1/eth/main/txs/push?token=" + process.env.BLOCK_CYPHER_TOKEN, {tx: zeTx.signature})
      //       .then(finalRes => console.log(finalRes))
      //       .catch(finalErr => console.log(finalErr));
      //   })
      //   .catch(error => console.log("TX ERROR: ", error));
    } else {
      throw new Error("PAYMENT DIDN'T GO THROUGH");
    }
  } catch (e) {
    console.log("PAYMENT DIDN'T GO THROUGH: ", e.message);
    return res.status(422).send(e.message);
  }
};



module.exports = {
  sendEth,
  generateNewEtherWallet,
  findPrivateKey
};
