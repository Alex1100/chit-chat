const infuraEndpoint = process.env.INFURA_ENDPOINT_MAIN_NETWORK;
const Web3 = require('web3');
const EthTx = require('ethereumjs-tx');

const web3 = new Web3(new Web3.providers.HttpProvider(infuraEndpoint));


const sendEth = async (req, res, next) => {
  try {
    if (req.decoded) {
      const { toAddr, fromAddr, amount } = req.body;

      const rawTx = {
        nonce: web3.toHex(web3.eth.getTransactionCount(fromAddr)),
        to: toAddr,
        gasPrice: web3.toHex(21000000000),
        gasLimit: web3.toHex(21000),
        value: web3.toHex(web3.toWei(amount, 'ether')),
        data: ""
      };

      const fromAddrPKey = "";
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
};
