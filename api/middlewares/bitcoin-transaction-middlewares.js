const axios   = require('axios');
const easyBTC = require('easy-bitcoin-js');
const bitcoin = require("bitcoinjs-lib");
const bigi    = require("bigi");


const instantiateBTCWallet = async (req, res, next) => {
  try {
    const {
      username,
      password
    } = req.body;

    const newWallet = easyBTC.newWallet();
    const name = username + "-chit-chat-v11";
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
            let btcPrivateKey = wallets.data.private;
            let btcPublicKey = wallets.data.public;
            let btcWIF = wallets.data.wif;
            let btcWalletAddress = wallets.data.addresses[0];

            //private/public/wif key password signing/encryption
            let encryptedPassword = new Buffer(password);
            let base64EncryptedPassword = encryptedPassword.toString('base64');

            let encryptedPublicKey = new Buffer(btcPublicKey);
            let base64EncryptedPublicKey = encryptedPublicKey.toString('base64');
            let btcWalletEncryptedPublicKey = base64EncryptedPassword + base64EncryptedPublicKey;

            let encryptedPrivateKey = new Buffer(btcPrivateKey);
            let base64EncryptedPrivateKey = encryptedPrivateKey.toString('base64');
            let btcWalletEncryptedPrivateKey = base64EncryptedPassword + base64EncryptedPrivateKey;

            let encryptedWIF = new Buffer(btcWIF);
            let base64EncryptedWIF = encryptedWIF.toString('base64');
            let btcWalletEncryptedWIF = base64EncryptedPassword + base64EncryptedWIF;

            req.btcWalletEncryptedPublicKey = btcWalletEncryptedPublicKey;
            req.btcWalletEncryptedPrivateKey = btcWalletEncryptedPrivateKey;
            req.btcWalletEncryptedWIF = btcWalletEncryptedWIF;
            req.btcWalletAddress = btcWalletAddress;
            next();
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
    const {
      username,
      password,
      amount,
      toAddr
    } = req.body;
    const user = User.findOne({where: {username}});

    const name = username + "-chit-chat-v11";

    let encryptedPassword = new Buffer(password);
    const base64EncryptedPassword = encryptedPassword.toString("base64");

    let data = user.btcWalletEncryptedPrivateKey.slice(base64EncryptedPassword.length, btcWalletEncryptedPrivateKey.length);
    let information = new Buffer(data, "base64").toString("ascii");
    privateKey = new Buffer(information).toString("hex");

    let keys = new bitcoin.ECPair(bigi.fromHex(privateKey));

    axios.get(`https://api.blockcypher.com/v1/btc/main/wallets/${name}/addresses?token=${process.env.BLOCK_CYPHER_TOKEN}`)
      .then(wallets => {
        console.log(`WALLETS FOR ${name} ARE: `, wallets.data);
        let userWallet = wallets.data.addresses[0];

        const sendTxBod = JSON.stringify({
          inputs: [{
            addresses: [userWallet]
          }],
          outputs: [{
            addresses: [toAddr],
            value: Math.floor(amount * Math.pow(10, 8))
          }]
        });

        axios.post(`https://api.blockcypher.com/v1/btc/main/txs/new`, sendTxBod)
          .then(toSignTxData => {
            console.log("toSignTxData is: ", toSignTxData.data);
            toSignTxData.data.pubKeys = [];
            toSignTxData.data.signatures = toSignTxData.data.tosign.map((tosign, n) => {
              toSignTxData.data.pubKeys.push(keys.getPublicKeyBuffer().toString("hex"));
              return keys.sign(new Buffer(tosign, "hex")).toDER().toString("hex")
            })

            axios.post(`https://api.blockcypher.com/v1/btc/main/txs/send`, toSignTxData.data)
              .then(finalTx => {
                console.log("FINALTX DATA IS: ", finalTx.data);
              })
          })
          .catch(err => console.log("ERROR: ", err.response.data.errors));
      })
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
  instantiateBTCWallet,
  sendBTC
};
