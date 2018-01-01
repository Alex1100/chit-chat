import {
  ADD_TO_RECORDER,
  UPDATE_DATAURL,
  SET_VIDEO,
  UPDATE_TITLE,
  UPDATE_DESCRIPTION,
  UPDATE_TOPIC,
  UPDATE_IMAGE,
  VIDEO_UPLOAD_SUCCESS,
  VIDEO_UPLOAD_FAILURE,
  SET_CURRENT_VIDEO
} from '../actions/video';


const videoData = (state = {
  video: '',
  recorder: '',
  videoURL: '',
  videoDescription: '',
  videoTitle: '',
  imageURL: '',
  message: '',
  videoTopic: '',
  currentVideo: '',
}, action) => {
  switch (action.type) {
    case SET_CURRENT_VIDEO:
      return {
        ...state,
        currentVideo: action.currentVideo
      };
    case UPDATE_TOPIC:
      return {
        ...state,
        videoTopic: action.videoTopic
      };
    case VIDEO_UPLOAD_SUCCESS:
      return {
        ...state,
        videoURL: action.videoURL,
        imageURL : action.imageURL,
        videoTitle: action.videoTitle,
        videoDescription: action.videoDescription,
        message: action.message
      };
    case VIDEO_UPLOAD_FAILURE:
      return {
        ...state,
        message: action.message
      }
    case UPDATE_IMAGE:
      return {
        ...state,
        imageURL: action.imageURL
      };
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
