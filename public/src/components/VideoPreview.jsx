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
              videoURL: props.videoURL,
              likes: props.likes
            },
            history: props.history
          }
        )
      )
    }}
  >
    <div class="card-container">
      <div class="card">
        <div class="side">
          <img
            className="vid-preview-thumnail"
            src={props.thumbnail}
          />
        </div>
        <div class="side back">
          <h3
            className="vid-preview-title">
            {props.title}
          </h3>
          <p
            className="vid-preview-description">
            {props.description}
          </p>
        </div>
      </div>
    </div>
  </div>
);


export default VideoPreview;
