const infuraEndpoint = process.env.INFURA_ENDPOINT_MAIN_NETWORK;
const Web3 = require('web3');
const EthTx = require('ethereumjs-tx');
const ethers = require('ethers');
const SHA3 = require('sha3');
const web3 = new Web3(new Web3.providers.HttpProvider(infuraEndpoint));
let n = require('nonce')();

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
      const { toAddr, fromAddr, amount } = req.body;

      const rawTx = {
        nonce: n(),
        to: toAddr,
        gasPrice: web3.utils.toHex(56000000000),
        gasLimit: web3.utils.toHex(52000),
        value: web3.utils.toHex(web3.utils.toWei(amount, 'ether')),
        data: ""
      };

      const fromAddrPKey = req.privateKey.slice(2, req.privateKey.length);
      let fromAddrPKeyX = new Buffer(fromAddrPKey, 'hex');
      const tx = new EthTx(rawTx);
      tx.sign(fromAddrPKeyX);
      let serializedTx = `0x${tx.serialize().toString('hex')}`;
      web3.eth.sendSignedTransaction(serializedTx, (err, data) => {
        if (err) {
          throw new Error(err);
        } else {
          req.sentTransaction = data;
          console.log("IT SENT THE MONEY!!!!!$$$$$$$");
          res.status(201).json({sentTransaction: req.sentTransaction, resStatus: 201})
        }
      });
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
