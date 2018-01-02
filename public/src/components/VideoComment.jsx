import React from 'react';

const VideoComment = (props) => (
  <div>
    <p>{props.comment.body}</p>
    <p>commented by: {props.user} at {props.comment.created_at}</p>
  </div>
);

export default VideoComment;
