const axios = require('axios');
const easyBTC = require('easy-bitcoin-js');


const generateBTCWallet = async (req, res, next) => {
  try {
    const {
      username
    } = req.body;
    const newWallet = easyBTC.newWallet();
    const name = username + "-chit-chat";
    const addressConfig = {
      name,
      address: [newWallet.address]
    };


    //register wallet on blockcypher with name/username
    axios.post(`https://api.blockcypher.com/v1/btc/main/wallets?token=${process.env.BLOCK_CYPHER_TOKEN}`, JSON.stringify(addressConfig))
      .then(newBTCWallet => {
        //get all blockcypher registered wallets for a given name/username
        axios.post(`https://api.blockcypher.com/v1/btc/main/wallets/${name}/addresses/generate?token=${process.env.BLOCK_CYPHER_TOKEN}`)
          .then(wallets => {
            console.log("WALLETS ARE: ", wallets.data);
            res.status(201).json(wallets.data);
          })
          .catch(erro => console.log("DIDNT REGISTER NEW WALLET UNDER NEW NAME: ", erro));
      })
  } catch (e) {
    if (res.status === 409) {
      console.log("Address already generated. ", e);
    } else {
      console.log("MY ERROR IS: ", e);
    }
  }
};

const sendBTC = async (req, res, next) => {
  try {
    //response output object should look like
    // {
    //   transactionChecker: "https://blockchain.info/tx/e421bf03a3c53c293776102f02d73de2d6efb723db6e99675bbef12b805ec2a1",
    //   successTxHash: "e421bf03a3c53c293776102f02d73de2d6efb723db6e99675bbef12b805ec2a1",
    //   from: "1MMaikwUNs9RJTxjtwQE3jo8UTfBsb3pfY",
    //   to: "1QBeRRipNgCx6zoCZ3R8u9NLwY3udaTqvS"
    // }
  } catch (e) {

  }
};



module.exports = {
  generateBTCWallet
};
