const Sequelize = require('sequelize');
const db = require('../config/database');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const User = require('../models/user').User;
const jwt = require('jsonwebtoken');
const axios = require('axios');


const signup = async (req, res) => {
  try {
    if (req.newWallet) {
      let { username, email, password } = req.body;
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      const hash = await bcrypt.hash(password, salt)
      const person = await User.findOne({ where: { username, email } });

      if (person) {
        const message = "That username or email is already taken. Please try another username or email";
        console.log(message);
        res.status(409).send({ errorMessage: message });
      } else {
        const user = await User.create({ username, walletAddress: req.newWallet.address, email, password: hash });
        const uploadUserURL = `${process.env.RAILS_MICROSERVICE}/users`;

        const axiosBod = {
          username
        }

        const axiosConfig = {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }

        const uploadedUser = await axios.post(uploadUserURL, axiosBod, axiosConfig);

        const payload = {
          username: user.username,
        };

        const token = jwt.sign(payload, process.env.jwtSecret);
        res.status(201).json({ token, user });
      }
    }
  } catch(e) {
    console.log(e);
    res.status(422).json({ errorMessage: e.message });
  }
};



const login = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const user = await User.findOne({ where: { username } });
    const data = await bcrypt.compare(password, user.password);

    const payload = {
      username: user.username
    };

    const token = jwt.sign(payload, process.env.jwtSecret);
    res.status(200).json({ token, user });
  } catch(e) {
    console.log(e.message);
    res.status(422).json({ errorMessage: e.message });
  }
};


module.exports =  {
  login,
  signup,
};
