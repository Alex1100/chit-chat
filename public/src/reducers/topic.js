import { INPUT_TOPIC, SELECT_TOPIC, ADD_NEW_TOPIC, TOPIC_ADD_FAILURE } from '../actions/topic';


const topicsData = (state = {
  isFetching: false,
  topicErrorMessage: '',
  selectedTopic: '',
  newTopic: '',
}, action) => {
  switch (action.type) {
    case SELECT_TOPIC:
      return {
        ...state,
        selectedTopic: action.selectedTopic,
      };
    case ADD_NEW_TOPIC:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case INPUT_TOPIC:
      return {
        ...state,
        newTopic: action.topic
      };
    case TOPIC_ADD_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        topicErrorMessage: action.message,
      };
    default:
      return state;
  }
};

export default topicsData;
