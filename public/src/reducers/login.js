import {
  UPDATE_USERNAME_INPUT,
  CLEAR_LOGIN,
  UPDATE_EMAIL_INPUT,
  UPDATE_PASSWORD_INPUT
} from '../actions/login';

const login = (state = {
  username: '',
  email: '',
  password: '',
},
action) => {
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
    case CLEAR_LOGIN:
      return {
        ...state,
        password: action.password,
      }
    default:
      return state;
  }
};

export default login;
