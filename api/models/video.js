const Sequelize = require('sequelize');
const db = require('../config/database');

const Video = db.define('video', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  thumbnail: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  donatedSoFar: {
    type: Sequelize.STRING,
    defaultValue: "0.00",
  },
  likes: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  comments: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    allowNull: true,
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
  Video,
};
