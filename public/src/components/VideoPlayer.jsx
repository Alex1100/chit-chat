import React from 'react';

const VideoPlayer = (props) => (
  <div className="video-wrapper">
    <video controls played className="video">
      <source type="video/webm" src={props.video.videoURL} />
    </video>
    <div className="playpause"></div>
    <br/>
    <div className="video-player-info-container">
      <label className="video-player-info-title">{props.video.title}</label>
      <p className="video-player-info-description">{props.video.description}</p>
      <p>Uploaded By: {props.user}</p>
    </div>
  </div>
);


export default VideoPlayer;
