import { combineReducers } from 'redux';
import auth from './auth';
import login from './login';
import signup from './signup';
import topicsData from './topic';

const RootReducer = combineReducers({
  auth,
  login,
  signup,
  topicsData,
});

export default RootReducer;
