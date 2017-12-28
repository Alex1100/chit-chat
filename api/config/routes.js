let router = require('express').Router();
const usersController = require('../controllers/users');
const topicsController = require('../controllers/topics');
const isAuthenticated = require('../middlewares').isAuthenticated;

router.post("/signup", usersController.signup);
router.post("/login", usersController.login);
router.post("/topics", isAuthenticated, topicsController.addTopic);
router.get("/topics", isAuthenticated, topicsController.getTopics);

module.exports = router;
