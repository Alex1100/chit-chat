import React, { Component } from 'react';
import VideoComment from '../components/VideoComment';
import {
  setVideoCommentsListView,
  updateCommentInput,
  addNewVideoComment
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
    console.log("NEW COMMENT INPUT IS: ", e.target.value);
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

  addComment() {
    const {
      dispatch,
      history,
      newComment,
      video,
      userId
    } = this.props;

    console.log("I GOT HERE!!!!: ", this.props);

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
            type="text"
            name="newComment"
            onChange={(e) => {
              e.preventDefault();
              this.handleChange(e);
            }}
          />
          <button
            className="video-comment-submit"
            onClick={() => this.addComment(e)}>
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
        <div>
          <p onClick={(e) => this.toggleView(e)}>Hide Comments</p>
        </div>
      </div>
    ) : (
      <div>
        <div
          className="video-comments-substition">
          <input
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
        <div>
          <p onClick={(e) => this.toggleView(e)}>Hide Comments</p>
        </div>
      </div>
    ) : (
      <div>
        <div
          className="video-comments-substition">
          <input
            type="text"
            name="newComment"
            onChange={(e) => {
              e.preventDefault();
              this.handleChange(e);
            }}
          />
          <button
            className="video-comment-submit"
            onClick={(e) => this.addComment()}>
            Add Comment
          </button>
        </div>
        <p onClick={(e) => this.toggleView(e)}>Show Comments</p>
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
