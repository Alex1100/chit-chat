const Sequelize = require('sequelize');
const db = require('../config/database');
const Video = require('../models/video').Video;
const Topic = require('../models/topic').Topic;
const axios = require('axios');


const getInfo = async (req, res) => {
  try {
    if (req.decoded) {
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
      let titleTaken = await Video.findOne({ where: { title: videoTitle } });
      if (!titleTaken) {
        const currentTopic = await Topic.findOne({ where: { name: videoTopic } });
        const thumbnail = JSON.parse(imageURL);
        const content = JSON.parse(videoURL);
        if (!currentTopic) {
          const newTopic = await Topic.create({ name: videoTopic });
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
      const zeVideos = await Video.findAll({});
      console.log("VIDEOS ARE HERE: ", zeVideos);
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
