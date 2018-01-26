const Sequelize = require('sequelize');
const db = require('../config/database');
const Topic = require('../models/topic').Topic;
const User = require('../models/user').User;
let client = require('../config/database').client;
const redis = require('redis');

//not used anymore
const addTopic = async (req, res) => {
  try {
    if (req.decoded) {
      const user = User.findOne({where: { username: req.decoded.username } });
      if (!user) {
        throw new Error("Invalid JWT Token");
      }
      const { name } = req.body;
      const allTopics = await Topic.findAll({});

      foundTopic = allTopics.some(el => el.name === name);

      if (foundTopic !== null || foundTopic !== false) {
        console.log("TOPIC ALREADY EXISTS");
        res.status(209);
      } else {
        const newTopic = await Topic.create({name});
        console.log("SETTING IN REDIS>>>");
        client.set("topics", JSON.stringify(allTopics), redis.print);
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

      client.get('topics', (error, topics) => {
        if (topics === null || topics === undefined || topics === "[]") {
          Topic.findAll({order: [['name', 'ASC']]}, (error, orderedTopics) => {
            if (!error) {
              client.set("topics", JSON.stringify(orderedTopics), redis.print);
              res.status(200).json(orderedTopics);
            } else {
              client.set("topics", JSON.stringify([]), redis.print);
              res.status(200).json([]);
            }
          })
        }
        let sortedTopics = JSON.parse(topics);
        res.status(200).json(sortedTopics);
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
