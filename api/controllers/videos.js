const Sequelize = require('sequelize');
const db = require('../config/database');
const Video = require('../models/video').Video;

const getInfo = async (req, res) => {
  try {
    if (req.sentTransaction) {
      const { title, amount } = req.body;
      const selectedVideo = await Video.findOne({ where: { title } });
      const donatedSoFar = (amount + parseFloat(selectedVideo.donatedSoFar)).toString();
      const updatedVideo = await Video.update({ donatedSoFar }, { where: { id: selectedVideo.id }});

      res.status(201).send(updatedVideo);
    } else {
      throw new Error("ETH TRANSACTION DID NOT GO THROGH...");
    }
  } catch (e) {
    console.log("ERROR WITH PAYMENT: ", e.message);
    res.status(422).send(e.message);
  }
};


module.exports = {
  getInfo,
};
