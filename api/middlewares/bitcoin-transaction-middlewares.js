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
            res.status(200).json(wallets.data);
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



module.exports = {
  generateBTCWallet
};
