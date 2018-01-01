import {
  GRAB_VIDEOS_REQUEST,
  GRAB_VIDEOS_SUCCESS,
  GRAB_VIDEOS_FAILURE
} from '../actions/videoList';


const videoListData = (state = {
  videos: [],
  isFetching: false,
  videoListErrorMessage: '',
  selectedVideo: '',
}, action) => {
  switch (action.type) {
    case GRAB_VIDEOS_REQUEST:
      return {
        ...state,
        isFetching: true,
        videoListErrorMessage: ''
      }
    case GRAB_VIDEOS_SUCCESS:
      return {
        ...state,
        videos: action.videos,
        isFetching: false,
        videoListErrorMessage: '',
        videosLoaded: action.videosLoaded
      }
    case GRAB_VIDEOS_FAILURE:
      return {
        ...state,
        videoListErrorMessage: action.videoListErrorMessage,
        isFetching: false
      }
    default:
      return state;
  }
};

export default videoListData;
