import axios from 'axios';

export const GRAB_VIDEOS_COMMENTS_REQUEST = "GRAB_VIDEOS_COMMENTS_REQUEST";
export const GRAB_VIDEOS_COMMENTS_SUCCESS = "GRAB_VIDEOS_COMMENTS_SUCCESS";
export const GRAB_VIDEOS_COMMENTS_FAILURE = "GRAB_VIDEOS_COMMENTS_FAILURE";
export const GRAB_COMMENT_COMMENTS_REQUEST = "GRAB_COMMENT_COMMENTS_REQUEST";
export const GRAB_COMMENT_COMMENTS_SUCCESS = "GRAB_COMMENT_COMMENTS_SUCCESS";
export const GRAB_COMMENT_COMMENT_FAILURE = "GRAB_COMMENT_COMMENT_FAILURE";
export const TOGGLE_COMMENT_LIST_VIEW = "TOGGLE_COMMENT_LIST_VIEW";


const toggleCommentListView = (commentsVisisble) => ({
  type: "TOGGLE_COMMENT_LIST_VIEW",
  commentsVisisble
});

const setVideoCommentsListView = (commentsVisisble) => (dispatch) => {
  dispatch(toggleCommentListView(commentsVisisble));
};


export { setVideoCommentsListView };
