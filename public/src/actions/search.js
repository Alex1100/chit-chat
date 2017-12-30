import axios from 'axios';

export const UPDATE_INPUT_TERM = "UPDATE_INPUT_TERM";
export const UPDATE_FILTER_SEARCH = "UPDATE_FILTER_SEARCH";
export const CLEAR_SEARCH_CONTENT = "CLEAR_SEARCH_CONTENT";


const updateSearch = (term) => ({
  type: "UPDATE_INPUT_TERM",
  input: term,
});

const updateFilter = (filter) => ({
  type: "UPDATE_FILTER_SEARCH",
  filter,
});

const clearSearchContext = () => ({
  type: "CLEAR_SEARCH_CONTENT",
  filter: "Videos",
  input: '',
});

const inputSearch = (term) => (dispatch) => {
  dispatch(updateSearch(term));
};

const filterChange = (filter, history) => (dispatch) => {
  dispatch(updateFilter(filter));
  history.push(history.location.pathname);
};

const clearSearch = () => (dispatch) => {
  dispatch(clearSearchContext());
};

const searchContent = (term, filter, history) => {
  return disptach => {
    //some func
  }
};

export { inputSearch, filterChange, clearSearch, searchContent };
