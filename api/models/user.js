const Sequelize = require('sequelize');
const db = require('../config/database').db;


const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  ethWalletAddress: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true
  },
  btcWalletAddress: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true
  },
  btcWalletEncryptedPrivateKey: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true
  },
  btcWalletEncryptedPublicKey: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true
  },
  btcWalletEncryptedWIF: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('NOW'),
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('NOW'),
  }
});


module.exports = {
  User,
}
