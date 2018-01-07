import axios from 'axios';

export const INCREMENT_LIKES = "INCREMENT_LIKES";
export const DECREMENT_LIKES = "DECREMENT_LIKES";
export const INCREMENT_LIKES_FAILURE = "INCREMENT_LIKES_FAILURE";
export const DECREMENT_LIKES_FAILURE = "DECREMENT_LIKES_FAILURE";
export const RESET_VIDEO = "RESET_VIDEO";


const resetVideo = (currentVideo) => ({
  type: "RESET_VIDEO",
  currentVideo
});

const startLikeAction = (info) => {
  return (dispatch) => {
    const axiosBod = {
      videoId: info.videoId,
      userId: info.userId,
      token: localStorage.getItem("token")
    };

    axios.post("/api/likes", axiosBod)
      .then(response => {
        console.log("RESPONSE IS: ", response);
        if (response.status !== 201 && response.status !== 208) {
          return Promise.reject({likesErrorMessage: "Failed to increment or decrement Like..."});
        }


        if (response.status === 201) {
          info.video["likes"].push(info.userId);
          dispatch(resetVideo(info.video));
          info.history.push("/video-player");
        } else if (response.status === 208) {
          info.video["likes"] = info.video["likes"].filter(el => el !== info.userId);
          dispatch(resetVideo(info.video));
          info.history.push("/video-player");
        }
      })
  }
};


export {
  startLikeAction
};
