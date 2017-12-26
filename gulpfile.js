const gulp = require('gulp');
const Promise = require('bluebird');
const environment = require('gulp-env');
const User = require('./api/models/user').User;

environment({
  file: './.env',
  type: 'ini'
});

gulp.task('reinitdb', (cb) => {
  User.sync({ force: true })
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
