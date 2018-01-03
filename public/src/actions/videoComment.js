import axios from 'axios';

export const GRAB_VIDEOS_COMMENTS_REQUEST = "GRAB_VIDEOS_COMMENTS_REQUEST";
export const GRAB_VIDEOS_COMMENTS_SUCCESS = "GRAB_VIDEOS_COMMENTS_SUCCESS";
export const GRAB_VIDEOS_COMMENTS_FAILURE = "GRAB_VIDEOS_COMMENTS_FAILURE";
export const GRAB_COMMENT_COMMENTS_REQUEST = "GRAB_COMMENT_COMMENTS_REQUEST";
export const GRAB_COMMENT_COMMENTS_SUCCESS = "GRAB_COMMENT_COMMENTS_SUCCESS";
export const GRAB_COMMENT_COMMENT_FAILURE = "GRAB_COMMENT_COMMENT_FAILURE";
export const TOGGLE_COMMENT_LIST_VIEW = "TOGGLE_COMMENT_LIST_VIEW";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const ADD_VIDEO_COMMENT = "ADD_VIDEO_COMMENT";
export const RESET_CURRENT_VIDEO = "SET_CURRENT_VIDEO";


const toggleCommentListView = (commentsVisible) => ({
  type: "TOGGLE_COMMENT_LIST_VIEW",
  commentsVisible
});

const updateComment = (newComment) => ({
  type: "UPDATE_COMMENT",
  newComment
});

const setCurrentVideo = (currentVideo) => ({
  type: "RESET_CURRENT_VIDEO",
  currentVideo
});

const playVideo = (info) => {
  return (dispatch) => {
    axios.get(`${RAILS_MICROSERVICE}/videos/${info.currentVideo.videoId}/comments`)
      .then(response => {
        console.log("COMMENTS ARE: ", response);
        console.log("VID LIKES ARE: ", info.currentVideo);
        info.currentVideo["comments"] = response.data.comments
        dispatch(setCurrentVideo(info.currentVideo));
        info.history.push("video-player");
      })
      .catch(err => {
        console.log("COULDN'T RETRIEVE COMMENTS: ", err);
      })
  }
}

const addNewVideoComment = (info) => {
  return (dispatch) => {
    console.log("INFO IS : ", info.content)
    const axiosBod = {
      body: info.content,
      commentable_type: "Video",
      commentable_id: info.currentVideo.videoId,
      user_id: info.user_id,
      token: localStorage.getItem("token"),
      video_id: info.currentVideo.videoId
    };

    axios.post(`/api/comment`, axiosBod)
      .then(response => {
        playVideo({ currentVideo: info.currentVideo, history: info.history });
      });
  }
};

const updateCommentInput = (comment) => (dispatch) => {
  dispatch(updateComment(comment));
};

const setVideoCommentsListView = (commentsVisible, history) => (dispatch) => {
  dispatch(toggleCommentListView(commentsVisible));
  history.push("/video-player");
};


export {
  setVideoCommentsListView,
  updateCommentInput,
  addNewVideoComment
};
