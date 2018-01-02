import axios from 'axios';

export const GRAB_VIDEOS_REQUEST = "GRAB_VIDEOS_REQUEST";
export const GRAB_VIDEOS_SUCCESS = "GRAB_VIDEOS_SUCCESS";
export const GRAB_VIDEOS_FAILURE = "GRAB_VIDEOS_FAILURE";


const updateVidRequest = () => ({
  type: "GRAB_VIDEOS_REQUEST",
  isFetching: true,
});

const updateVidFailure = (videoListErrorMessage) => ({
  type: "GRAB_VIDEOS_FAILURE",
  isFetching: false,
  videoListErrorMessage
});

const updateVidList = (videos) => ({
  type: "GRAB_VIDEOS_SUCCESS",
  videos
});

const updateVideoRequest = () => (dispatch) => {
  dispatch(updateVidRequest());
};

const updateVideoFailure = (videoListErrorMessage) => (dispatch) => {
  dispatch(updateVidFailure(videoListErrorMessage));
};

const grabVideos = (history) => {
  return (dispatch) => {
    dispatch(updateVideoRequest());
    axios.get(`/api/videos/${localStorage.getItem("token")}`)
      .then(response => {
        if (response.data.videos.length < 1) {
          return Promise.reject(response.data.videos);
          dispatch(updateVideoFailure("COULDN'T GRAB VIDEOS"));
        }

        dispatch(updateVidList(response.data.videos));
        history.push("/videos");
      })
      .catch(err => {
        dispatch(updateVideoFailure("COULDN'T GRAB VIDEOS"));
        console.log("COULDN'T GRAB VIDEOS: ", err)
      });
  };
};


export {
  updateVideoRequest,
  updateVideoFailure,
  grabVideos
}
