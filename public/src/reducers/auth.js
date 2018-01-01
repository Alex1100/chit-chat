import {
  GRAB_ALL_TOPICS,
  GRAB_ALL_TOPICS_REQUEST,
  GRAB_ALL_TOPICS_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS
} from '../actions/auth';


const auth = (state = {
  isFetching: false,
  isAuthenticated: !!localStorage.getItem('token'),
  errorMessage: '',
  user: '',
  email: '',
  topics: [],
  videos: [],
}, action) => {
  switch (action.type) {
    case GRAB_ALL_TOPICS:
      return {
        ...state,
        topics: action.topics
      };
    case GRAB_ALL_TOPICS_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case GRAB_ALL_TOPICS_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        topics: action.topics,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        errorMessage: action.errorMessage,
        user: action.user,
        email: action.email,
        id: action.id,
        topics: action.topics,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        errorMessage: action.errorMessage,
        user: action.user,
        email: action.email,
        id: action.id,
        topics: action.topics,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        errorMessage: action.message,
        user: action.user,
        email: action.email,
        id: action.id,
        topics: action.topics,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        errorMessage: action.errorMessage,
        user: action.user,
        email: action.email,
        id: action.id,
        topics: action.topics,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        errorMessage: action.errorMessage,
        user: action.user,
        email: action.email,
        id: action.id,
        topics: action.topics,
      };
    default:
      return state;
  }
};

export default auth;
