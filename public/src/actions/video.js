import axios from 'axios';

export const ADD_TO_RECORDER = "ADD_TO_RECORDER";
export const SET_VIDEO = "SET_VIDEO";
export const UPDATE_DATAURL = "UPDATE_DATAURL";
export const UPDATE_TITLE = "UPDATE_TITLE";
export const UPDATE_DESCRIPTION = "UPDATE_DESCRIPTION";
export const UPDATE_TOPIC = "UPDATE_TOPIC";
export const UPDATE_IMAGE = "UPDATE_IMAGE";
export const VIDEO_UPLOAD_SUCCESS = "VIDEO_UPLOAD_SUCCESS";
export const VIDEO_UPLOAD_FAILURE = "VIDEO_UPLOAD_FAILURE";
export const SET_CURRENT_VIDEO = "SET_CURRENT_VIDEO";

const addToRecorderObject = (recorder) => ({
  type: "ADD_TO_RECORDER",
  recorder,
});

const setVideObject = (video) => ({
  type: "SET_VIDEO",
  video,
});

const updateDataURL = (dataURL) => ({
  type: "UPDATE_DATAURL",
  videoURL: dataURL,
});

const updateVideoTitle = (title) => ({
  type: "UPDATE_TITLE",
  videoTitle: title,
});

const updateVideoDescription = (description) => ({
  type: "UPDATE_DESCRIPTION",
  videoDescription: description,
});

const updateVideoTopic = (topic) => ({
  type: "UPDATE_TOPIC",
  videoTopic: topic,
});

const updateVideoImageURL = (imageURL) => ({
  type: "UPDATE_IMAGE",
  imageURL
});

const failedVideoUpload = (message) => ({
  type: "VIDEO_UPLOAD_FAILURE",
  message
});

const successVideoUpload = () => ({
  type: "VIDEO_UPLOAD_SUCCESS",
  videoURL: '',
  imageURL : '',
  videoTitle: '',
  videoDescription: '',
  message: ''
});

const setCurrentVideo = (currentVideo) => ({
  type: "SET_CURRENT_VIDEO",
  currentVideo
});

const updateRecorder = (recorder) => (dispatch) => {
  console.log("UPDATING RECORDER: ", recorder);
  dispatch(addToRecorderObject(recorder));
};


const setVideo = (video) => (dispatch) => {
  dispatch(setVideObject(video));
};

const updateVideoDataURL = (dataURL) => (dispatch) => {
  dispatch(updateDataURL(dataURL));
};

const clearRecorder = (recorder) => (dispatch) => {
  dispatch(addToRecorderObject(recorder = ''));
};

const updateTitleInput = (title) => (dispatch) => {
  dispatch(updateVideoTitle(title));
};

const updateDescriptionInput = (description) => (dispatch) => {
  dispatch(updateVideoDescription(description));
};

const updateTopicInput = (topic) => (dispatch) => {
  dispatch(updateVideoTopic(topic));
};

const updateImageURL = (imageURL) => (dispatch) => {
  dispatch(updateVideoImageURL(imageURL));
};

const uploadVideo = (props) => {
  return (dispatch) => {
    const axiosBod = {
      videoTitle: props.videoTitle,
      videoDescription: props.videoDescription,
      videoURL: JSON.stringify(props.videoURL),
      imageURL: JSON.stringify(props.imageURL),
      userId: props.userId,
      videoTopic: props.videoTopic,
      token: localStorage.getItem("token")
    };

    axios.post("/api/upload", axiosBod)
      .then(response => {
        if(response.data.resCode !== 201) {
          dispatch(failedVideoUpload("Bad Request..."));
          return Promise.reject(response.resCode);
        }

        dispatch(successVideoUpload());
        props.history.push('/');
      })
      .catch(err => console.log("ERROR UPLOADING VIDEO IS: ", err));
  }
};


const playVideo = (info) => (dispatch) => {
  dispatch(setCurrentVideo(info.currentVideo));
  info.history.push("video-player");
}


export {
  updateRecorder,
  updateVideoDataURL,
  setVideo,
  clearRecorder,
  updateTitleInput,
  updateDescriptionInput,
  updateTopicInput,
  updateImageURL,
  uploadVideo,
  playVideo
};
