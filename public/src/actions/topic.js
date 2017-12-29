import axios from 'axios';


export const INPUT_TOPIC = "INPUT_TOPIC";
export const ADD_NEW_TOPIC = "ADD_NEW_TOPIC";
export const ADDED_NEW_TOPIC = "ADDED_NEW_TOPIC";
export const TOPIC_ADD_FAILURE = "TOPIC_ADD_FAILURE";
export const SELECT_TOPIC = "SELECT_TOPIC";
export const GRAB_ALL_TOPICS_FAILURE = "GRAB_ALL_TOPICS_FAILURE";
export const GRAB_ALL_TOPICS = "GRAB_ALL_TOPICS";
export const GRAB_ALL_TOPICS_REQUEST = "GRAB_ALL_TOPICS_REQUEST";

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

const selectATopic = (selectedTopic) => ({
  type: "SELECT_TOPIC",
  selectedTopic,
});


const failedToGrabAllTopics = () => ({
  type: "GRAB_ALL_TOPICS_FAILURE",
  isFetching: false,
  topics: [],
});

const grabAllTopicsRequest = () => ({
  type: "GRAB_ALL_TOPICS_REQUEST",
  isFetching: true,
  topics: [],
})

const grabAllTopicsSuccess = (topics) => ({
  type: "GRAB_ALL_TOPICS",
  topics,
});


const inputTopic = (topic) => (dispatch) => {
  dispatch(inputNewTopic(topic));
};

const selectTopic = (info) => (dispatch) => {
  dispatch(selectATopic(info[0]));
};


const addTopic = (topic, history) => {
  return (dispatch) => {
    dispatch(addNewTopicRequest());

    const name = topic;
    const token = localStorage.getItem("token");

    return axios.post(`/api/topics`, {name, token})
      .then(response => {
        if(!response.data.name) {
          dispatch(failedToAddNewTopic("Failed to load topics..."));
          history.push('/');
          return Promise.reject();
        }

        dispatch(addedNewTopic());
        grabAllTopics(dispatch);
        history.push('/');
      })
      .catch(err => console.log("COULDN'T ADD NEW TOPIC: ", err));
  }
};


const grabAllTopics = (dispatch) => {
  dispatch(grabAllTopicsRequest());

  const token = localStorage.getItem("token");

  return axios.get(`api/topics/${token}`)
    .then(response => {
      if(!response.data) {
        dispatch(failedToGrabAllTopics());
        return Promise.reject(response);
      }

      dispatch(grabAllTopicsSuccess(response.data));
    })
    .catch(err => console.log("ERROR GRABBING ALL TOPICS: ", err));
};


export { addTopic, selectTopic, inputTopic };
