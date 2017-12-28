import axios from 'axios';
import { grabAllTopics } from './auth';


export const INPUT_TOPIC = "INPUT_TOPIC";
export const ADD_NEW_TOPIC = "ADD_NEW_TOPIC";
export const ADDED_NEW_TOPIC = "ADDED_NEW_TOPIC";
export const TOPIC_ADD_FAILURE = "TOPIC_ADD_FAILURE";
export const SELECT_TOPIC = "SELECT_TOPIC";

const inputNewTopic = (topic) => ({
  type: "INPUT_TOPIC",
  topic
});

const addNewTopicRequest = () => ({
  type: "ADD_NEW_TOPIC",
  isFetching: true,
});

const addedNewTopic = () => ({
  type: "ADDED_NEW_TOPIC",
  isFetching: false,
});

const failedToAddNewTopic = (message) => ({
  type: "TOPIC_ADD_FAILURE",
  isFetching: false,
  message,
});

const selectTopic = (selectedTopic) => ({
  type: "SELECT_TOPIC",
  selectedTopic,
});


const addTopic = (topic, history) => {
  return (dispatch) => {
    dispatch(addNewTopicRequest());

    axios.post("/api/topics", {topic})
      .then(response => {
        if(response.data.topic.length < 1) {
          dispatch(failedToAddNewTopic("Failed to load topics..."));
          history.push('/');
          return Promise.reject();
        }

        dispatch(addedNewTopic());
        grabAllTopics();
        history.push('/');
      })
      .catch(err => console.log("COULDN'T ADD NEW TOPIC: ", err));
  }
};

export { addTopic, selectTopic };
