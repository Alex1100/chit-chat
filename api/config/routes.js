let router = require('express').Router();

//controllers
const usersController = require('../controllers/users');
const topicsController = require('../controllers/topics');
const videosController = require('../controllers/videos');

//middlewares
const isAuthenticated = require('../middlewares/index').isAuthenticated;
const sendEth = require('../middlewares/ethereum-transaction-middlewares').sendEth;


router.post("/signup", usersController.signup);
router.post("/login", usersController.login);
router.post("/topics", isAuthenticated, topicsController.addTopic);
router.get("/topics/:token", isAuthenticated, topicsController.getTopics);
router.post("/donate", [isAuthenticated, sendEth], videosController.getInfo);


module.exports = router;
