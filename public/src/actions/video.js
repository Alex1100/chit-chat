export const ADD_TO_RECORDER = "ADD_TO_RECORDER";
export const SET_VIDEO = "SET_VIDEO";
export const UPDATE_DATAURL = "UPDATE_DATAURL";
export const UPDATE_TITLE = "UPDATE_TITLE";
export const UPDATE_DESCRIPTION = "UPDATE_DESCRIPTION";


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


export {
  updateRecorder,
  updateVideoDataURL,
  setVideo,
  clearRecorder,
  updateTitleInput,
  updateDescriptionInput
};
