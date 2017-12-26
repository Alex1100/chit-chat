import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';


const requestLogin = user => ({
  type: 'LOGIN_REQUEST',
  isFetching: true,
  isAuthenticated: false,
  errorMessage: '',
  user,
  email: '',
  id: 0,
});


const receiveLogin = info => ({
  type: 'LOGIN_SUCCESS',
  isFetching: false,
  isAuthenticated: true,
  errorMessage: '',
  user: info.user,
  email: info.email,
  id: info.id,
});


const loginError = message => ({
  type: 'LOGIN_FAILURE',
  isFetching: false,
  isAuthenticated: false,
  errorMessage: message,
  user: undefined,
  email: '',
  id: 0,
});


const requestLogout = () => ({
  type: 'LOGOUT_REQUEST',
  isFetching: true,
  isAuthenticated: true,
  errorMessage: '',
  user: undefined,
  email: '',
  id: 0,
});


const receiveLogout = () => ({
  type: 'LOGOUT_SUCCESS',
  isFetching: false,
  isAuthenticated: false,
  errorMessage: '',
  user: undefined,
  email: '',
  id: 0,
});


const loginUser = (creds, history) => {
  let axiosBod = {
    username: creds.username,
    email: creds.email,
    password: creds.password
  };

  return (dispatch) => {
    dispatch(requestLogin(creds.username));
    console.log("CREDS ARE: ", creds);
    return axios.post(`/api/login`, axiosBod)
      .then(response => {
        if(!response.data.email){
          dispatch(loginError('Bad Request...'));
          return Promise.reject(response);
        }

        localStorage.setItem('token', "true");
        const user = response.data.username;
        const email = response.data.email;
        const id = reponse.data.id;

        dispatch(receiveLogin({ user, email, id }));
        history.push("/");
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
        console.log("YOOO: ", response);
        if (!response.data.email) {
          dispatch(loginError('Bad Request...'));
          return Promise.reject(response);
        }

        localStorage.setItem('token', "true");

        const user = response.data.username;
        const email = response.data.email;
        const id = response.data.id;

        dispatch(receiveLogin({ user, email, id }));
        history.push("/");
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


export { logoutUser, signupUser, loginUser };
