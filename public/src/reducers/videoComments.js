import {
  GRAB_VIDEOS_COMMENTS_REQUEST,
  GRAB_VIDEOS_COMMENTS_SUCCESS,
  GRAB_VIDEOS_COMMENTS_FAILURE,
  GRAB_COMMENT_COMMENTS_REQUEST,
  GRAB_COMMENT_COMMENTS_SUCCESS,
  GRAB_COMMENT_COMMENT_FAILURE,
  TOGGLE_COMMENT_LIST_VIEW,
  UPDATE_COMMENT
} from '../actions/videoComment';

const videoCommentsData = (state = {
  newComment: '',
  commentsVisible: false,
  selectedComment: '',
  commentErrorMessage: '',
}, action) => {
  switch (action.type) {
    case UPDATE_COMMENT:
      return {
        ...state,
        newComment: action.newComment
      };
    case TOGGLE_COMMENT_LIST_VIEW:
      return {
        ...state,
        commentsVisible: action.commentsVisible
      }
    default:
      return state;
  }
};

export default videoCommentsData;
