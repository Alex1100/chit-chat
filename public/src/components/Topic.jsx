import React from 'react';
import { selectTopic } from '../actions/topic';

const Topic = (props) => (
  <div>
    <div>
      <p
        className="topic-text"
        onClick={(e) => {
          props.dispatch(
            selectTopic(
              [
                props.name,
                props.history
              ]
            )
          )
        }}>
        <span
          className="topic-id">
          #{props.id}
        </span>
        :
        <span
          className="topic-name">
          {props.name}
        </span>
      </p>
    </div>
  </div>
);


export default Topic;
