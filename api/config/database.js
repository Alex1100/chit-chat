require('dotenv').config();
require('dotenv').load();

const Sequelize = require('sequelize');
let db = null;

if (process.env.DATABASE_URL) {
  db = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
  });
  console.log(`CONNECTED TO REMOTE DB AT PORT#: ${process.env.DATABASE_URL}`);
} else {
  console.error('FATAL: NO REMOTE DB SOURCE FOUND...');
  setTimeout(() => {
    process.exit(1);
  }, 100);
}

module.exports = db;
