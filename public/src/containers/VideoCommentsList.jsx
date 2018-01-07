import React, { Component } from 'react';
import VideoComment from '../components/VideoComment';
import {
  setVideoCommentsListView,
  updateCommentInput,
  addNewVideoComment,
  resetCommentInput
} from '../actions/videoComment';
import { connect } from 'react-redux';


class VideoCommentsList extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.addComment = this.addComment.bind(this);
  }

  handleChange(e) {
    const { dispatch } = this.props;
    dispatch(updateCommentInput(e.target.value));
  }

  toggleView() {
    const {
      dispatch,
      commentsVisible,
      history
    } = this.props;

    let isDisplayed;

    if (commentsVisible === undefined || commentsVisible === false) {
      isDisplayed = true;
    } else if (commentsVisible === true) {
      isDisplayed = false;
    }

    dispatch(setVideoCommentsListView(isDisplayed, history));
  }

  addComment(e) {
    const {
      dispatch,
      history,
      newComment,
      video,
      userId
    } = this.props;

    if (newComment.length > 0) {
      dispatch(addNewVideoComment(
        {
          content: newComment,
          user_id: userId,
          currentVideo:
            {
              videoId: video.videoId,
              title: video.title,
              description: video.description,
              videoURL: video.videoURL,
              likes: video.likes
            },
          history
        })
      );

    const commentInput = document.getElementsByClassName('comment-input');
    commentInput[0].value = '';
    }
  }

  render() {
    const {
      comments,
      dispatch,
      history,
      user,
      commentsVisible
    } = this.props;

    return commentsVisible ? comments && comments.length > 0 ? (
      <div>
        <div
          className="video-comments-substition">
          <input
            className="comment-input"
            type="text"
            name="newComment"
            onChange={(e) => {
              e.preventDefault();
              this.handleChange(e);
            }}
          />
          <button
            className="video-comment-submit"
            onClick={(e) => this.addComment(e)}>
            Add Comment
          </button>
        </div>
        {
          comments.map((comment, wi) => (
            <VideoComment
              key={wi.toString()}
              dispatch={dispatch}
              history={history}
              comment={comment}
              user={user}
            />
          ))
        }
        <div className="toggle-comment-container">
          <p onClick={(e) => this.toggleView(e)}>Hide Comments</p>
        </div>
      </div>
    ) : (
      <div>
        <div
          className="video-comments-substition">
          <input
            className="comment-input"
            type="text"
            name="newComment"
            onChange={(e) => {
              e.preventDefault();
              this.handleChange(e);
            }}
          />
          <button
            className="video-comment-submit"
            onClick={(e) => this.addComment(e)}>
            Add Comment
          </button>
        </div>
        <div className="toggle-comment-container">
          <p onClick={(e) => this.toggleView(e)}>Hide Comments</p>
        </div>
      </div>
    ) : (
      <div>
        <div
          className="video-comments-substition">
          <input
            className="comment-input"
            type="text"
            name="newComment"
            onChange={(e) => {
              e.preventDefault();
              this.handleChange(e);
            }}
          />
          <button
            className="video-comment-submit"
            onClick={(e) => this.addComment(e)}>
            Add Comment
          </button>
        </div>
        <div className="toggle-comment-container">
          <p onClick={(e) => this.toggleView(e)}>Show Comments</p>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  const { videoCommentsData } = state;
  const {
    newComment,
    commentsVisible,
    selectedComment,
    commentErrorMessage
  } = videoCommentsData;

  return {
    newComment,
    selectedComment,
    commentsVisible,
    commentErrorMessage
  };
};

export default connect(mapStateToProps)(VideoCommentsList);
