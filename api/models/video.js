const Sequelize = require('sequelize');
const db = require('../config/database').db;
const User = require('./user').User;
const Topic = require('./topic').Topic;


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
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: [],
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

User.hasMany(Video, {
  foreignKey: 'user_id',
  allowNull: false,
  onDelete: 'CASCADE'
});

Video.belongsTo(User, {
  foreignKey: 'user_id',
  allowNull: false,
  onDelete: 'CASCADE'
});

Topic.hasMany(Video, {
  foreignKey: 'topic_id',
  allowNull: false,
  onDelete: 'CASCADE'
});

Video.belongsTo(Topic, {
  foreignKey: 'topic_id',
  allowNull: false,
  onDelete: 'CASCADE'
});


module.exports = {
  Video,
};
