const Sequelize = require('sequelize');
const db = require('../config/database');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const User = require('../models/user').User;

const signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt)
    const person = await User.findOne({ where: { username, email } });

    if (person) {
      const message = "That username or email is already taken. Please try another username or email";
      console.log(message);
      res.status(409).send({ errorMessage: message });
    } else {
      password = hash;
      const newUser = await User.create({ username, email, password });
      res.status(201).send(newUser);
    }
  } catch(e) {
    console.log(e);
    res.status(422).send({ errorMessage: e.message });
  }
};



const login = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const user = await User.findOne({ where: { username, email } });
    const data = await bcrypt.compare(password, user.password);
    console.log("User logged in");
    res.status(200).send(user);
  } catch(e) {
    console.log(e.message);
    res.status(422).send({ errorMessage: e.message });
  }
};


module.exports =  {
  login,
  signup,
};
