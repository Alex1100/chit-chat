import React, { Component } from 'react';
import VideoPlayer from './VideoPlayer';
import VideoCommentsList  from '../containers/VideoCommentsList';


const Video = (props) => (
  <div>
    <VideoPlayer
      video={props.video}
      user={props.user}
    />
    <div
      className="video-likes-container">
      <p>
        <span>{props.video.likes}</span> {(props.video.likes < 1 || props.video.likes > 1) ? "Likes" : "Like"}
      </p>
    </div>
    <div
      className="video-comments-container">
      <VideoCommentsList
        dispatch={props.dispatch}
        history={props.history}
        comment={props.comment}
        user={props.user}
      />
    </div>
  </div>
);

export default Video;
