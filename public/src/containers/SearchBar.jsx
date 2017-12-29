import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FormGroup,
  InputGroup,
  DropdownButton,
  MenuItem,
  FormControl,
  Col,
} from 'react-bootstrap';

import {
  inputSearch,
  filterChange,
  searchContent,
} from '../actions/search';


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.search = this.search.bind(this);
  }

  handleInputChange(e) {
    const { dispatch } = this.props;
    dispatch(inputSearch(e.target.value))
  }

  handleFilterChange(e) {
    const { dispatch } = this.props;
    dispatch(filterChange(e.target.getAttribute("value")));
  }

  search() {
    const {
      dispatch,
      history,
      input,
      filter
    } = this.props;

    dispatch(searchContent(input, filter, history));
  }

  render() {
    const { input, filter } = this.props;
    console.log("INPUTIS: ", input, "\n", filter);
    console.log("SEARCH BAR NEEDS TO BE FIXED....");
    return (
      <div className="search-input-container">
        <form>
          <div
            className="search-input"
          >
            <Col md={6}>
              <input
                className="search-input-text"
                type="text"
                name="term"
                placeholder="Search by topics or video titles"
                onChange={(e) => {e.preventDefault(); this.handleInputChange(e)}}
              />
              <DropdownButton
                componentClass={InputGroup.Button}
                id="input-dropdown-addon"
                title={filter}
                name="filter"
              >
                <MenuItem onClick={(e) => {e.preventDefault(); this.handleFilterChange(e)}} key="1" value="Videos">Videos</MenuItem>
                <MenuItem onClick={(e) => {e.preventDefault(); this.handleFilterChange(e)}} key="2" value="Topics">Topics</MenuItem>
              </DropdownButton>
            </Col>
          </div>
          <br/>
          <Col mdOffset={0} md={2}>
            <button onClick={(e) => {e.preventDefault(); this.search(e)}}>
              Search
            </button>
          </Col>
        </form>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const { search } = state;
  const { input, filter } = search;
  return {
    input,
    filter,
  };
};


export default connect(mapStateToProps)(SearchBar);


