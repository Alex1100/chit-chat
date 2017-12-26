import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS } from '../actions/auth';


const auth = (state = {
  isFetching: false,
  isAuthenticated: !!localStorage.getItem('token'),
  errorMessage: '',
  user: '',
  email: '',
}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      console.log("STATE PAYLOAD IS: ", action.payload);
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        errorMessage: action.errorMessage,
        user: action.user,
        email: action.email,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        errorMessage: action.errorMessage,
        user: action.user,
        email: action.email,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        errorMessage: action.message,
        user: action.user,
        email: action.email,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        errorMessage: action.errorMessage,
        user: action.user,
        email: action.email,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        errorMessage: action.errorMessage,
        user: action.user,
        email: action.email,
      };
    default:
      return state;
  }
};

export default auth;
