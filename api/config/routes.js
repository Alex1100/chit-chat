let router = require('express').Router();

//controllers
const usersController = require('../controllers/users');
const topicsController = require('../controllers/topics');
const videosController = require('../controllers/videos');
const commentsController = require('../controllers/comments');

//middlewares
const isAuthenticated = require('../middlewares/index').isAuthenticated;
const sendEth = require('../middlewares/ethereum-transaction-middlewares').sendEth;


router.post("/signup", usersController.signup);
router.post("/login", usersController.login);

router.post("/topics", isAuthenticated, topicsController.addTopic);
router.get("/topics/:token", isAuthenticated, topicsController.getTopics);

router.post("/donate", [isAuthenticated, sendEth], videosController.getInfo);

router.post("/upload", isAuthenticated, videosController.addVideo);
router.get("/videos", isAuthenticated, videosController.grabVideos);

router.get("/comments", isAuthenticated, commentsController.grabVideoComments)
router.post("/comment", isAuthenticated, commentsController.addComment);
router.delete("/comment", isAuthenticated, commentsController.deleteController);


module.exports = router;
