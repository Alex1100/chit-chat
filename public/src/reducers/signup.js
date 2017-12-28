import { UPDATE_USERNAME_INPUT, CLEAR_SIGNUP, UPDATE_EMAIL_INPUT, UPDATE_PASSWORD_INPUT } from '../actions/signup';

const signup = (state = {
  username: '',
  email: '',
  password: '',
}, action) => {
  switch (action.type) {
    case UPDATE_USERNAME_INPUT:
      return {
        ...state,
        username: action.username,
      };
    case UPDATE_EMAIL_INPUT:
      return {
        ...state,
        email: action.email,
      };
    case UPDATE_PASSWORD_INPUT:
      return {
        ...state,
        password: action.password,
      };
    case CLEAR_SIGNUP:
      return {
        ...state,
        password: action.password,
      }
    default:
      return state;
  }
};

export default signup;
