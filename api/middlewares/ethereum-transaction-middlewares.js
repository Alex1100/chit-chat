const infuraEndpoint = process.env.INFURA_ENDPOINT_MAIN_NETWORK;
const Web3 = require('web3');
const EthTx = require('ethereumjs-tx');
const ethers = require('ethers');
const SHA3 = require('sha3');
const web3 = new Web3(new Web3.providers.HttpProvider(infuraEndpoint));

const findPrivateKey = async (req, res) => {
  try {
    if (req.body.user_creds) {
      const {
        user_creds
      } = req.body;

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


const generateNewEtherWallet = async (req, res) => {
  try {
    if (req.body.user_creds) {
      const {
        user_creds
      } = req.body;

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
    if (req.decoded && req.privateKey) {
      const { toAddr, fromAddr, amount } = req.body;

      const rawTx = {
        nonce: web3.toHex(web3.eth.getTransactionCount(fromAddr)),
        to: toAddr,
        gasPrice: web3.toHex(21000000000),
        gasLimit: web3.toHex(21000),
        value: web3.toHex(web3.toWei(amount, 'ether')),
        data: ""
      };

      const fromAddrPKey = req.privateKey;
      let fromAddrPKeyX = new Buffer(fromAddrPKey, 'hex');
      const tx = new EthTx(rawTx);
      tx.sign(fromAddrPKeyX);
      let serializedTx = `0x${tx.serialize().toString('hex')}`;
      const sentTransaction = await web3.eth.sendRawTransaction(serializedTx);
      req.sentTransaction = sentTransaction;
      next();
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
  generateNewEtherWallet
};
