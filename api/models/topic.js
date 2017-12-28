const Sequelize = require('sequelize');
const db = require('../config/database');

const Topic = db.define('topic', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
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
  Topic,
};
