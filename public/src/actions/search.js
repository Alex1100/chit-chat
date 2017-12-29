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
  console.log("TERM IS: ", term);
  dispatch(updateSearch(term));
};

const filterChange = (filter) => {
  return (dispatch) => {
    console.log("FILTER IS: ", filter);
    dispatch(updateFilter(filter));
  }
};

const clearSearch = () => (dispatch) => {
  dispatch(clearSearchContext());
};

const searchContent = (term, filter, history) => {
  return disptach => {
    //some func
  }
};

module.exports = {
  inputSearch,
  filterChange,
  clearSearch,
  searchContent,
};
