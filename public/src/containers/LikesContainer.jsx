import React, { Component } from 'react';
import {
  startLikeAction
} from '../actions/likes';

class LikesContainer extends Component {
  constructor(props) {
    super(props);

    this.handleLike = this.handleLike.bind(this);
  }


  handleLike(e) {
    const {
      dispatch,
      history,
      user,
      userId,
      videoId,
      video
    } = this.props;

    dispatch(startLikeAction({
      dispatch,
      history,
      user,
      userId,
      videoId,
      video
    }));
  }


  render() {
    const {
      userId,
      likes
    } = this.props;

    return (
      <div className="like-btn-container">
        <p>
          <div onClick={(e) => {e.preventDefault(); this.handleLike(e)}} class="btn btn-info btn-lg">
            <span class="glyphicon glyphicon-thumbs-up"></span> {likes.includes(userId) ? "Unlike" : "Like" }
          </div>
        </p>
      </div>
    )
  }
}

export default LikesContainer
