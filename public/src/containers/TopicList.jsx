import React, { Component } from 'react';
import { connect } from "react-redux";
import Topic from "../components/Topic";
import { addTopic, inputNewTopic } from "../actions/topic";

class TopicsList extends Component {
  constructor(props) {
    super(props);
    this.handleTopicChange = this.handleTopicChange.bind(this);
    this.addNewTopic = this.addNewTopic.bind(this);
  }

  handleTopicChange(e) {
    const { dispatch } = this.props;
    dispatch(inputNewTopic(e.target.value));
  }

  addNewTopic(topic) {
    const { dispatch, history, newTopic } = this.props;
    dispatch(addTopic(newTopic, history));
  }


  render() {
    const { topics, selectedTopic, newTopic, dispatch, history } = this.props;
    return topics ? (
      <div>
        <label>Add New Topic</label>
        <input type="text" name="newTopic" value={newTopic} />
        <button type="submit" onClick={(e) => {e.preventDefault; this.addNewTopic()}}></button>
        <br/>
        <h1>All Topics</h1>
        {
          topics.map((el, i) => (
            <Topic key={i} info={el.info}/>
          ))
        }
      </div>
    ) : (
      <div>
        <label>Add New Topic</label>
        <input type="text" name="newTopic" value={newTopic} />
        <button type="submit" onClick={(e) => {e.preventDefault; this.addNewTopic()}}></button>
        <br/>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  const { topicsData } = state;
  const { selectedTopic, newTopic} = topicsData
  return {
    selectedTopic,
    newTopic,
  };
}


export default connect(mapStateToProps)(TopicsList);
