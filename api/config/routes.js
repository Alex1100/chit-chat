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
const instantiateEtherWallet = require('../middlewares/ethereum-transaction-middlewares').instantiateEtherWallet;
const findPrivateKey = require('../middlewares/ethereum-transaction-middlewares').findPrivateKey;
const instantiateBTCWallet = require('../middlewares/bitcoin-transaction-middlewares').instantiateBTCWallet;
const sendBTC = require('../middlewares/bitcoin-transaction-middlewares').sendBTC;


//Auth
router.post("/signup", [instantiateEtherWallet, instantiateBTCWallet], usersController.signup);
router.post("/login", usersController.login);


//Topics
router.post("/topics", isAuthenticated, topicsController.addTopic);
router.get("/topics/:token", isAuthenticated, topicsController.getTopics);


//ETH DONATION
router.post("/donate", [isAuthenticated, findPrivateKey, sendEth], videosController.getInfo);


//VIDEO
router.post("/upload", isAuthenticated, videosController.addVideo);
router.get("/videos/:token", isAuthenticated, videosController.grabVideos);


//COMMENTS
router.get("/comments", isAuthenticated, commentsController.grabVideoComments)
router.post("/comment", isAuthenticated, commentsController.addComment);
router.delete("/comment", isAuthenticated, commentsController.deleteComment);


//LIKES
router.post("/likes", isAuthenticated, likesController.toggleLike);


//TEST SENDING ETHER
router.post("/send-eth", findPrivateKey, sendEth);
router.post("/send-btc", instantiateBTCWallet);


module.exports = router;
