import {
  ADD_TO_RECORDER,
  UPDATE_DATAURL,
  SET_VIDEO,
  UPDATE_TITLE,
  UPDATE_DESCRIPTION
} from '../actions/video';


const videoData = (state = {
  video: '',
  recorder: '',
  videoURL: '',
  videoDescription: '',
  videoTitle: '',
}, action) => {
  switch (action.type) {
    case UPDATE_TITLE:
      return {
        ...state,
        videoTitle: action.videoTitle,
      };
    case UPDATE_DESCRIPTION:
      return {
        ...state,
        videoDescription: action.videoDescription,
      };
    case ADD_TO_RECORDER:
      return {
        ...state,
        recorder: action.recorder,
      };
    case SET_VIDEO:
      return {
        ...state,
        video: action.video,
      };
    case UPDATE_DATAURL:
      return {
        ...state,
        videoURL: action.videoURL,
        recorder: '',
      }
    default:
      return state;
  }
};

export default videoData;
