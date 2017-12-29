import React, { Component } from 'react';
import { connect } from "react-redux";
import Topic from "../components/Topic";
import { addTopic, inputTopic } from "../actions/topic";

class TopicsList extends Component {
  constructor(props) {
    super(props);
    this.handleTopicChange = this.handleTopicChange.bind(this);
    this.addNewTopic = this.addNewTopic.bind(this);
  }

  handleTopicChange(e) {
    const { dispatch } = this.props;
    dispatch(inputTopic(e.target.value));
  }

  addNewTopic(topic) {
    const { dispatch, history, newTopic } = this.props;
    dispatch(addTopic(newTopic, history));
  }


  render() {
    const { topics, selectedTopic, newTopic, dispatch, history } = this.props;
    return topics ? (
      <div className="topics-list">
        <div className="topics-add-container">
          <label className="topics-add-label">Add New Topic</label>
          <input className="topics-add-input" type="text" onChange={(e) => {e.preventDefault(); this.handleTopicChange(e)}} name="newTopic" value={newTopic} />
          <button className="topics-add-btn" type="submit" onClick={(e) => {e.preventDefault; this.addNewTopic()}}></button>
        </div>
        <br/>
        <h1 className="topics-header">All Topics</h1>
        {
          topics.map((el, wi) => (
            <Topic className="topic-item" dispatch={dispatch} history={history} key={wi.toString()} id={el.id} name={el.name}/>
          ))
        }
      </div>
    ) : (
      <div className="topics-list">
        <div className="topics-add-container">
          <label>Add New Topic</label>
          <input type="text" onChange={(e) => {e.preventDefault(); this.handleTopicChange(e)}} name="newTopic" value={newTopic} />
          <button type="submit" onClick={(e) => {e.preventDefault; this.addNewTopic()}}></button>
        </div>
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
