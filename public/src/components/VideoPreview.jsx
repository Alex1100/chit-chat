import React from 'react';
import { playVideo } from '../actions/video';

const VideoPreview = (props) => (
  <div
    className="vid-preview-container"
    onClick={() => {
      props.dispatch(
        playVideo(
          {
            currentVideo:
            {
              videoId: props.videoId,
              title: props.title,
              description: props.description,
              videoURL: props.videoURL
            },
            history: props.history
          }
        )
      )
    }}
  >
    <h3
      className="vid-preview-title">
      {props.title}
    </h3>
    <img
      className="vid-preview-thumnail"
      src={props.thumbnail}
    />
    <p
      className="vid-preview-topic">
      #{props.topic}
    </p>
    <p
      className="vid-preview-description">
      {props.description}
    </p>
  </div>
);


export default VideoPreview;
