import React from 'react';
import { selectTopic } from '../actions/topic';

const Topic = (props) => (
  <div>
    <div>
      <p onClick={(e) => {props.dispatch(selectTopic(props.info, props.history))}}>#{props.key}: {props.info}</p>
    </div>
  </div>
);


export default Topic;
