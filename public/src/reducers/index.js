import { combineReducers } from 'redux';
import auth from './auth';
import login from './login';
import signup from './signup';

const RootReducer = combineReducers({
  auth,
  login,
  signup,
});

export default RootReducer;
