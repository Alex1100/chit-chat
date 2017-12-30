import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Col,
} from 'react-bootstrap';

import {
  inputSearch,
  filterChange,
  searchContent,
} from '../actions/search';

import {
  RadioGroup,
  Radio,
} from 'react-radio-group';


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
    const { dispatch, history } = this.props;
    dispatch(filterChange(e, history));
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
    return (
      <div className="search-input-container">
        <div
          className="search-input"
        >
          <input
            className="search-input-text"
            type="text"
            name="input"
            value={input}
            onChange={(e) => {e.preventDefault(); this.handleInputChange(e)}}
          />
          <br/>
          <RadioGroup name="fruit" selectedValue={filter} onChange={(e) => this.handleFilterChange(e)}>
            <span className="radio-btn"><Radio id="VideosRadio" value="Videos" />Videos</span>
            <span className="radio-btn"><Radio id="TopicsRadio" value="Topics" />Topics</span>
          </RadioGroup>
        </div>
        <br/>
        <br/>
        <Col mdOffset={0} md={2}>
          <button onClick={(e) => {e.preventDefault(); this.search(e)}}>
            Search
          </button>
        </Col>
      </div>
    )
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


