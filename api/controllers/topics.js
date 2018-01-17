const Sequelize = require('sequelize');
const db = require('../config/database');
const Topic = require('../models/topic').Topic;
const User = require('../models/user').User;
const redis = require("redis");
let client = require('../config/database').client;

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
        if (error || topics === null || topics === undefined) {
          console.log("HELLOOOOOOOO");
          Topic.findAll({}).then(topics => {
            res.status(200).json(topics);
          })
          .catch(err => {
            throw new Error(error);
          });
        }


        console.log("IT WORKED FROM REDIS WOOOO")

        res.status(200).json(JSON.parse(topics));
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
