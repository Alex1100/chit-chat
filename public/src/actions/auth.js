import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const GRAB_ALL_TOPICS_FAILURE = "GRAB_ALL_TOPICS_FAILURE";
export const GRAB_ALL_TOPICS = "GRAB_ALL_TOPICS";
export const GRAB_ALL_TOPICS_REQUEST = "GRAB_ALL_TOPICS_REQUEST";


const clearLogin = () => ({
  type: "CLEAR_LOGIN",
  password: ''
});

const requestLogin = user => ({
  type: 'LOGIN_REQUEST',
  isFetching: true,
  isAuthenticated: false,
  errorMessage: '',
  user,
  email: '',
  id: 0,
  topics: [],
});


const receiveLogin = info => ({
  type: 'LOGIN_SUCCESS',
  isFetching: false,
  isAuthenticated: true,
  errorMessage: '',
  user: info.user,
  email: info.email,
  id: info.id,
  topics: [],
});


const loginError = message => ({
  type: 'LOGIN_FAILURE',
  isFetching: false,
  isAuthenticated: false,
  errorMessage: message,
  user: undefined,
  email: '',
  id: 0,
  topics: [],
});


const requestLogout = () => ({
  type: 'LOGOUT_REQUEST',
  isFetching: true,
  isAuthenticated: true,
  errorMessage: '',
  user: undefined,
  email: '',
  id: 0,
  topics: [],
});


const receiveLogout = () => ({
  type: 'LOGOUT_SUCCESS',
  isFetching: false,
  isAuthenticated: false,
  errorMessage: '',
  user: undefined,
  email: '',
  id: 0,
  topics: [],
});

const failedToGrabAllTopics = () => ({
  type: "GRAB_ALL_TOPICS_FAILURE",
  isFetching: false,
  topics: [],
});

const grabAllTopicsRequest = () => ({
  type: "GRAB_ALL_TOPICS_REQUEST",
  isFetching: true,
  topics: [],
})

const grabAllTopicsSuccess = (topics) => ({
  type: "GRAB_ALL_TOPICS",
  topics,
});


const grabAllTopics = (dispatch) => {
  dispatch(grabAllTopicsRequest());

  const token = localStorage.getItem("token");

  return axios.get(`api/topics/${token}`)
    .then(response => {
      if(!response.data) {
        dispatch(failedToGrabAllTopics());
        return Promise.reject(response);
      }

      dispatch(grabAllTopicsSuccess(response.data));
    })
    .catch(err => console.log("ERROR GRABBING ALL TOPICS: ", err));
};


const loginUser = (creds, history) => {
  let axiosBod = {
    username: creds.username,
    email: creds.email,
    password: creds.password
  };

  return (dispatch) => {
    dispatch(requestLogin(creds.username));
    return axios.post(`/api/login`, axiosBod)
      .then(response => {
        if(!response.data.token){
          dispatch(loginError('Bad Request...'));
          return Promise.reject(response);
        }

        dispatch(clearLogin());

        localStorage.setItem('token', response.data.token);
        const user = response.data.user.username;
        const email = response.data.user.email;
        const id = response.data.user.id;

        grabAllTopics(dispatch);
        dispatch(receiveLogin({ user, email, id }));
        history.push('/');
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  };
};


const signupUser = (creds, history) => {
  const axiosBod = {
    username: creds.username,
    email: creds.email,
    password: creds.password,
  };

  return (dispatch) => {
    dispatch(requestLogin(creds));
    return axios.post('/api/signup', axiosBod)
      .then(response => {
        if (!response.data.token) {
          dispatch(loginError('Bad Request...'));
          return Promise.reject(response);
        }

        dispatch(clearLogin());

        localStorage.setItem('token', response.data.token);
        const user = response.data.user.username;
        const email = response.data.user.email;
        const id = response.data.user.id;

        grabAllTopics(dispatch);
        dispatch(receiveLogin({ user, email, id }));
        history.push('/');
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  };
};


const logoutUser = (history) => (dispatch) => {
  dispatch(requestLogout());
  localStorage.removeItem('token');
  dispatch(receiveLogout());
  history.push('/');
};


export { logoutUser, signupUser, loginUser, grabAllTopics };
