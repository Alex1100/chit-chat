import { ADD_TO_RECORDER, SET_VIDEO } from '../actions/video';


const videoData = (state = {
  video: '',
  recorder: '',
}, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default videoData;
