const Sequelize = require('sequelize');
const db = require('../config/database');
const axios = require('axios');
const User = require('../models/user').User;


const deleteComment = async (req, res) => {
  try {
    if(req.decoded) {
      const user = User.findOne({where: { username: req.decoded.username } });
      if (!user) {
        throw new Error("Invalid JWT Token");
      }
      const { commentId } = req.body;
      const deleteURL = `${process.env.RAILS_MICROSERVICE}/comments/${commentId}`;
      const deletedComment = await axios.delete(deleteURL);
      res.status(204).send({deletedComment});
    }
  } catch (e) {
    console.log("COULDN'T DELETE THE VIDEO: ", e);
    res.status(422).send({ errorMessage: e});
  }
};

const grabVideoComments = async (req, res) => {
  try {
    if (req.decoded) {
      const user = User.findOne({where: { username: req.decoded.username } });
      if (!user) {
        throw new Error("Invalid JWT Token");
      }
      const { videoId } = req.body;
      const commentsURL = `${process.env.RAILS_MICROSERVICE}/videos/${videoId}/comments`;
      const videoComments = await axios.get(commentsURL);
      res.status(200).send({ videoComments });
    }
  } catch (e) {
    console.log("COUDLN'T GRAB VIDEO COMMENTS: ", e);
    res.status(422).send({errorMessage: e});
  }
};

const addComment = async (req, res) => {
  try {

    if (req.decoded) {
      const user = User.findOne({where: { username: req.decoded.username } });
      if (!user) {
        throw new Error("Invalid JWT Token");
      }

      let axiosBod = req.body;

      const axiosConfig = {
        "Content-Type": "application/json",
        "Accept": "application/json"
      };

      const uploadCommentURL = `${process.env.RAILS_MICROSERVICE}/comments`;

      const uploadedComment = await axios.post(uploadCommentURL, axiosBod, axiosConfig);
      res.sendStatus(201);
    }
  } catch (e) {
    console.log("COUDLN'T UPLOAD COMMENT: ", e);
    res.status(422).send({errorMessage: e});
  }
};


module.exports = {
  grabVideoComments,
  addComment,
  deleteComment
};
