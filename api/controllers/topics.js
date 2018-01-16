const Sequelize = require('sequelize');
const db = require('../config/database');
const Topic = require('../models/topic').Topic;
const User = require('../models/user').User;
const redis = require("redis");
let client = require('../config/database').client;


const addTopic = async (req, res) => {
  try {
    if (req.decoded) {
      const user = User.findOne({where: { username: req.decoded.username } });
      if (!user) {
        throw new Error("Invalid JWT Token");
      }
      const { name } = req.body;
      const foundTopic = await Topic.findOne({ where: { name }});

      if (foundTopic !== null) {
        console.log("TOPIC ALREADY EXISTS");
        res.status(209);
      } else {
        const newTopic = await Topic.create({name});

        res.status(201).json(newTopic);
      }
    } else {
      throw new Error("Invalid JWT Token");
    }
  } catch (e) {
    console.log("COULDN'T ADD NEW TOPIC: ", e.message);
    res.status(422).json({errorMessage: e.message});
  }
};


const getTopics = async (req, res) => {
  try {
    if (req.decoded) {
      const user = await User.findOne({where: { username: req.decoded.username } });
      if (!user) {
        throw new Error("Invalid JWT Token");
      }

      const topicsCount = await Topic.findAll({attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), "count"]]});
      client.get("topics", (err, allTopics) => {
        if (err) {
          throw new Error("Invalid JWT Token");
        }

        if(
            JSON.parse(allTopics) === undefined ||
            JSON.parse(allTopics)[0].id.toString() !== topicsCount[0].dataValues.count
        ){
          Topic.findAll({order: Sequelize.col('name')})
            .then(topics => {
              client.set("topics", JSON.stringify(topics), redis.print);
              res.status(200).json(topics);
            })
        } else {
          client.get('topics', (error, topics) => {
            res.status(200).json(JSON.parse(topics));
          });
        }
      });
    } else {
      throw new Error("Invalid JWT Token");
    }
  } catch (e) {
    console.log("COULDN'T GET ALL TOPICS: ", e.message);
    return res.status(422).json(e.message);
  }
};


module.exports = {
  addTopic,
  getTopics,
};
