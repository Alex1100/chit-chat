const Sequelize = require('sequelize');
const Video = require("../models/video").Video;


const toggleLike = async (req, res) => {
  try {
    const {
      videoId,
      userId
    } = req.body;

    const currentVideo = await Video.findOne({ where: { id: videoId } });
    const checkIfLiked = currentVideo.likes.includes(userId);
    let tempLikes = currentVideo.likes.map(el => el);

    if (checkIfLiked === true) {
      tempLikes = tempLikes.filter(el => el !== userId);
    } else {
      tempLikes.push(userId);
    }

    Video.update({
      title: currentVideo.title,
      description: currentVideo.description,
      thumbnail: currentVideo.thumbnail,
      content: currentVideo.content,
      donatedSoFar: currentVideo.donatedSoFar,
      likes: tempLikes,
      created_at: currentVideo.created_at,
      updated_at: Sequelize.fn('NOW')
    }, {
      where: {
        id: currentVideo.id
      }
    });

    if (checkIfLiked) {
      res.sendStatus(208);
    } else {
      res.sendStatus(201);
    }

  } catch (e) {
    console.log("COULDN'T LIKE/UNLIKE BECAUSE: ", e);
    res.sendStatus(422);
  }
}


module.exports = {
  toggleLike,
};
