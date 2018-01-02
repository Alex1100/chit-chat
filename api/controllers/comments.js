const Sequelize = require('sequelize');
const db = require('../config/database');
const axios = require('axios');


const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.body;
    const deleteURL = `${process.env.RAILS_MICROSERVICE}/comments/${commentId}`;
    const deletedComment = await axios.delete(deleteURL);
    res.status(204).send({deletedComment});
  } catch (e) {
    console.log("COULDN'T DELETE THE VIDEO: ", e);
    res.status(422).send({ errorMessage: e});
  }
};

const grabVideoComments = async (req, res) => {
  try {
    const { videoId } = req.body;
    const commentsURL = `${process.env.RAILS_MICROSERVICE}/${videoId}/comments`;
    const videoComments = await axios.get(commentsURL);
    res.status(200).send({ videoComments });
  } catch (e) {
    console.log("COUDLN'T GRAB VIDEO COMMENTS: ", e);
    res.status(422).send({errorMessage: e});
  }
};

const addComment = async (req, res) => {
  try {
    const {
      commentableType,
      commentableId,
      content,
      userId
    } = req.body;

    const axiosBod = {
      commentable_type: commentableType,
      commentable_id: commentableId,
      body: content,
      user_id: userId
    };

    const axiosConfig = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    };

    const uploadCommentURL = `${process.env.RAILS_MICROSERVICE}/comments`;

    const uploadedComment = await axios.post(uploadCommentURL, axiosBod, axiosConfig);

    if (!uploadedComment) {
      throw new Error("COULDN'T UPLOAD COMMENT...");
    } else {
      res.status(201).send({uploadedComment});
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
