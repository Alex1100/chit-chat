export const ADD_TO_RECORDER = "ADD_TO_RECORDER";
export const SET_VIDEO = "SET_VIDEO";

const addToRecorderObject = (recorder) => ({
  type: "ADD_TO_RECORDER",
  recorder,
});

const setVideObject = (video) => ({
  type: "SET_VIDEO",
  video,
});

const updateRecorder = (recorder) => (dispatch) => {
  dispatch(addToRecorderObject(recorder));
};

const setVideo = (video) => (dispatch) => {
  dispatch(setVideObject(video));
}


export { updateRecorder, setVideo };
