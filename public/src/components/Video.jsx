import React, { Component } from 'react';
import VideoPlayer from '../containers/VideoPlayer';
import VideoCommentsList  from '../containers/VideoCommentsList';
import LikesContainer from '../containers/LikesContainer';


const Video = (props) => (
  <div>
    <VideoPlayer
      video={props.video}
      user={props.user}
    />
    <div
      className="video-likes-container">
      <p>
        <span>{props.video.likes.length}</span> {(props.video.likes.length < 1 || props.video.likes.length > 1) ? "likes" : "like"}
      </p>
    </div>
    <LikesContainer
      user={props.user}
      userId={props.userId}
      dispatch={props.dispatch}
      history={props.history}
      videoId={props.video.videoId}
      likes={props.video.likes}
      video={props.video}
    />
    <div
      className="video-comments-container">
      <VideoCommentsList
        dispatch={props.dispatch}
        history={props.history}
        comments={props.video.comments}
        user={props.user}
        video={props.video}
        userId={props.userId}
      />
    </div>
  </div>
);

export default Video;
