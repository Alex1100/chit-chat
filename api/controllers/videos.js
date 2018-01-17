const Sequelize = require('sequelize');
const db = require('../config/database');
const Video = require('../models/video').Video;
const Topic = require('../models/topic').Topic;
const axios = require('axios');
const User = require('../models/user').User;
const redis = require("redis");
let client = require('../config/database').client;


const getInfo = async (req, res) => {
  try {
    if (req.decoded) {
      const user = User.findOne({where: { username: req.decoded.username } });
      if (!user) {
        throw new Error("Invalid JWT Token");
      }
      const { title, amount } = req.body;
      const selectedVideo = await Video.findOne({ where: { title } });
      const donatedSoFar = (amount + parseFloat(selectedVideo.donatedSoFar)).toString();
      const updatedVideo = await Video.update({ donatedSoFar }, { where: { id: selectedVideo.id }});

      res.status(201).send(updatedVideo);
    } else {
      throw new Error("Invalid JWT Token...");
    }
  } catch (e) {
    console.log("ERROR WITH TOKEN: ", e.message);
    res.status(422).send(e.message);
  }
};

const addVideo = async (req, res) => {
  try {
    const {
      videoTitle,
      videoURL,
      imageURL,
      videoDescription,
      userId,
      videoTopic
    } = req.body;

    if (req.decoded) {
      const user = User.findOne({where: { username: req.decoded.username } });
      if (!user) {
        throw new Error("Invalid JWT Token");
      }
      let titleTaken = await Video.findOne({ where: { title: videoTitle } });
      if (!titleTaken) {
        let allTopics = await Topic.findAll({order: [['name', 'ASC']]});
        let currentTopic = allTopics.some(el=> el.name === videoTopic);
        const thumbnail = JSON.parse(imageURL);
        const content = JSON.parse(videoURL);

        if (!currentTopic) {
          const newTopic = await Topic.create({ name: videoTopic });
          let cachedTopics = await Topic.findAll({order: [['name', 'ASC']]});
          console.log("SETTING IN REDIS>>>: ", cachedTopics);
          client.set("topics", JSON.stringify(cachedTopics), redis.print);
          const newVideo = await Video.create({
            title: videoTitle,
            description: videoDescription,
            thumbnail,
            content,
            user_id: userId,
            topic_id: newTopic.id
          });
        } else {
          const newVideo = await Video.create({
            title: videoTitle,
            description: videoDescription,
            thumbnail,
            content,
            user_id: userId,
            topic_id: currentTopic.id
          });
        }

        const videoUploadURL = `${process.env.RAILS_MICROSERVICE}/videos`;
        const axiosBod = {
          title: videoTitle,
          user_id: userId
        };

        const axiosConfig = {
          "Content-Type": "application/json",
          "Accept": "application/json"
        };

        const uploadedVideo = await axios.post(videoUploadURL, axiosBod, axiosConfig);

        res.status(201).send({resCode: 201});
      }
    } else {
      throw new Error("Invalid JWT Token...");
    }
  } catch (e) {
    console.log("ERROR IS: ", e);
    res.status(422).send(e.message);
  }
};


const grabVideos = async (req, res) => {
  try {
    if (req.decoded) {
      const user = User.findOne({where: { username: req.decoded.username } });
      if (!user) {
        throw new Error("Invalid JWT Token");
      }
      const zeVideos = await Video.findAll({});
      res.status(200).json({videos: zeVideos});
    } else {
      throw new Error("Invalid JWT Token...");
    }
  } catch (e) {
    console.log("ERROR GETTING VIDS: ", e);
  }
};


module.exports = {
  getInfo,
  addVideo,
  grabVideos
};
