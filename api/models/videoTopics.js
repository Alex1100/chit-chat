const Video = require('./video').Video;
const Topic = require('./topic').Topic;
const db = require('../config/database');
const Sequelize = require('sequelize');

const VideoTopic = db.define('video_topic', {
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('NOW'),
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('NOW'),
  }
});

Video.hasMany(VideoTopic, { foreignKey: 'video_id', allowNull: false, onDelete: 'CASCADE' });
VideoTopic.belongsTo(Video, { foreignKey: 'video_id', allowNull: false, onDelete: 'CASCADE' });
Topic.hasMany(VideoTopic, { foreignKey: 'topic_id', allownull: false, onDelete: 'CASCADE' });
VideoTopic.belongsTo(Topic, { foreignKey: 'topic_id', allowNull: false, onDelete: 'CASCADE' });


module.exports = {
  VideoTopic,
};
