let router = require('express').Router();


//controllers
const usersController = require('../controllers/users');
const topicsController = require('../controllers/topics');
const videosController = require('../controllers/videos');
const commentsController = require('../controllers/comments');
const likesController = require('../controllers/likes');


//middlewares
const isAuthenticated = require('../middlewares/index').isAuthenticated;
const sendEth = require('../middlewares/ethereum-transaction-middlewares').sendEth;
const createEthWallet = require('../middlewares/ethereum-transaction-middlewares').generateNewEtherWallet;


//Auth
router.post("/signup", createEthWallet, usersController.signup);
router.post("/login", usersController.login);


//Topics
router.post("/topics", isAuthenticated, topicsController.addTopic);
router.get("/topics/:token", isAuthenticated, topicsController.getTopics);


//ETH DONATION
router.post("/donate", [isAuthenticated, sendEth], videosController.getInfo);


//VIDEO
router.post("/upload", isAuthenticated, videosController.addVideo);
router.get("/videos/:token", isAuthenticated, videosController.grabVideos);


//COMMENTS
router.get("/comments", isAuthenticated, commentsController.grabVideoComments)
router.post("/comment", isAuthenticated, commentsController.addComment);
router.delete("/comment", isAuthenticated, commentsController.deleteComment);


//LIKES
router.post("/likes", isAuthenticated, likesController.toggleLike);


module.exports = router;
