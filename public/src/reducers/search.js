import {
  UPDATE_INPUT_TERM,
  UPDATE_FILTER_SEARCH,
  CLEAR_SEARCH_CONTENT
} from '../actions/search';

const search = (state = {
  input: '',
  filter: "Videos",
}, action) => {
  switch (action.type) {
    case UPDATE_INPUT_TERM:
      return {
        ...state,
        input: action.input,
      };
    case UPDATE_FILTER_SEARCH:
      return {
        ...state,
        filter: action.filter,
      };
    case CLEAR_SEARCH_CONTENT:
      return {
        ...state,
        input: action.input,
        filter: action.filter,
      };
    default:
      return state;
  }
};

export default search;
