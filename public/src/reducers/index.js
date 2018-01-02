import { combineReducers } from 'redux';
import auth from './auth';
import login from './login';
import signup from './signup';
import topicsData from './topic';
import search from './search';
import videoData from './video';
import videoListData from './videoList';
import videoCommentsData from './videoComments';


const RootReducer = combineReducers({
  auth,
  login,
  signup,
  topicsData,
  search,
  videoData,
  videoListData,
  videoCommentsData
});

export default RootReducer;
