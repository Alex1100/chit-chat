import {
  GRAB_VIDEOS_COMMENTS_REQUEST,
  GRAB_VIDEOS_COMMENTS_SUCCESS,
  GRAB_VIDEOS_COMMENTS_FAILURE,
  GRAB_COMMENT_COMMENTS_REQUEST,
  GRAB_COMMENT_COMMENTS_SUCCESS,
  GRAB_COMMENT_COMMENT_FAILURE,
  TOGGLE_COMMENT_LIST_VIEW
} from '../actions/videoComment';


const videoCommentsData = (state = {
  newComment: [],
  commentsVisisble: false,
  selectedComment: false,
  commentErrorMessage: '',
}, action) => {
  switch (action.type) {
    case TOGGLE_COMMENT_LIST_VIEW:
      return {
        ...state,
        commentsVisisble: action.commentsVisisble
      }
    default:
      return state;
  }
};

export default videoCommentsData;
