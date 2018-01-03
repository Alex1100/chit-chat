require('dotenv').load();
require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const debug = require('debug')('app:http');
const cors = require('cors');

const db = require('./api/config/database');
const routes = require('./api/config/routes');
const PORT = process.env.PORT || 3005;
const path = require('path');

//optional for adding SSL certs later on
// const https = require('https');
// const fs = require('fs');
// const options = {
//     key: fs.readFileSync(path.join(__dirname, '/server.key')),
//     cert: fs.readFileSync(path.join(__dirname, '/server.crt')),
//     requestCert: false,
//     rejectUnauthorized: false
// };

// const server = https.createServer(options, app);

const server = require('http').Server(app);

function debugReq(req, res, next){
  debug("params:", req.params);
  debug("query:", req.query);
  debug("body:", req.body);
  next();
};

var whitelist = [
  "http://localhost:3005",
  "http://0.0.0.0:3005",
  "http://localhost:3000",
  "http://0.0.0.0:3000",
];

var corsOptions = {
    origin: function(origin, callback){
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Request-Method", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Max-Age", "1728000");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});

app.use(logger('dev'));
app.use(bodyParser.json({limit: "10500mb"}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(debugReq);
app.use('/', express.static(path.join(__dirname, "public")));
app.use('/api', routes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});


if(process.env.NODE_ENV !== 'PRODUCTION') {
  process.once('uncaughtException', function(err) {
    console.error('FATAL: Uncaught exception.');
    console.error(err.stack || err);
    setTimeout(function(){
      process.exit(1);
    }, 100);
  });
}
