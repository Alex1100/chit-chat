import React, { Component } from 'react';
import VideoPlayer from '../components/VideoPlayer';


class Video extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(e) {
    const { dispatch } = this.props;
    dispatch(updateCommentInput(e.target.value));
  }



  render() {
    let likesString;
    const {
      video,
      comments
    } = this.props;

    if (video.likes < 1 || video.likes > 1) {
      likesString = "Likes";
    } else {
      likesString = "Like";
    }

    return (
      <div>
        <VideoPlayer
          video={video}
        />
        <div
          className="video-likes-container">
          <p>
            {video.likes likesString}
          </p>
        </div>
        <div
          className="video-comments-container">
          {
            comments.map((comment, wi) => (
              <Comment
                dispatch={dispatch}
                history={history}
                comment={comment}
              />
            ))
          }
          <div
            className="video-comments-substition">
            <input
              type="text"
              name="comment"
              onChange={(e) => {
                e.preventDefault();
                this.handleChange(e);
              }}
            />
            <button
              className="video-comment-submit">
              Add Comment
            </button>
          </div>
        </div>
      </div>
    );
  }
};


const mapStateToProps = (state) => {
  const { videoComments } = state;
  const { comments } = videoComments;
  return {
    comments,
  };
};


export default connect(mapStateToProps)(Video);
