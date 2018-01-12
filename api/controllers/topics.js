const Sequelize = require('sequelize');
const db = require('../config/database');
const Topic = require('../models/topic').Topic;


const addTopic = async (req, res) => {
  try {
    if (req.decoded) {
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
      const topics = await Topic.findAll({order: Sequelize.col('name')});
      res.status(200).json(topics);
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
