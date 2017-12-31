const gulp = require('gulp');
const environment = require('gulp-env');
const User = require('./api/models/user').User;
const Topic = require('./api/models/topic').Topic;
const Video = require('./api/models/video').Video;
const VideoTopic = require('./api/models/videoTopics').VideoTopic;
const Sequelize = require('sequelize');
const db = require('./api/config/database');

environment({
  file: './.env',
  type: 'ini'
});

gulp.task('reinitdb', (cb) => {
  User.sync({ force: true })
    .then(() => Topic.sync({ force: true }))
    .then(() => Video.sync({ force: true }))
    .then(() => VideoTopic.sync({ force: true }))
    .then(() => {
      console.log("successfully reinitialized and connected to db...");
      cb();
      process.exit(0);
    })
    .catch((err) => {
      console.log("ERROR REINIT DB: ", err)
      cb(err);
      process.exit(1);
    });
});
