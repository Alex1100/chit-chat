import React, { Component } from 'react';
import { loginUser } from '../actions/auth';
import {
  inputUsername,
  inputEmail,
  inputPassword
} from '../actions/login';

import Particles from 'reactparticles.js';

import { connect } from 'react-redux';
import { emailRegX } from '../utils/index';


class Login extends Component {
  constructor(props) {
    super(props);

    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.LoginUser = this.LoginUser.bind(this);
  }

  componentDidMount() {
    let el = document.getElementById("particles-js-tile-1-particles");
    el.style['top'] = "180px"
  }

  handleUsername(e) {
    this.props.dispatch(inputUsername(e.target.value));
  }

  handleEmail(e) {
    this.props.dispatch(inputEmail(e.target.value));
  }

  handlePassword(e) {
    this.props.dispatch(inputPassword(e.target.value));
  }

  LoginUser(){
    const {
      username,
      email,
      password,
      dispatch,
      history
    } = this.props;

    if(
      username.length >= 6 &&
      emailRegX.test(email) &&
      password.length >= 6
    ){
      dispatch(loginUser({ username, email, password }, history))
    }
  }

  render() {
    const {
      errorMessage,
      username,
      email,
      password
    } = this.props;

    return errorMessage === undefined ||
     errorMessage.length < 0 ? (
      <div>
        <Particles
          id="tile-1-particles"
          config="../../../src/utils/particles.json"
        />
          <div className="login-container">
            <form>
              <label className="login-username-label">
                Username
              </label>
              <input
                className="login-username-input"
                type='text'
                name='username'
                onChange={(e) => {
                  e.preventDefault();
                  this.handleUsername(e);
                }}
                value={username}
              />
              <br/>
              <label className="login-email-label">
                Email
              </label>
              <input
                className="login-email-input"
                type="text"
                name="email"
                onChange={(e) => {
                  e.preventDefault();
                  this.handleEmail(e);
                }}
                value={email}
              />
              <br/>
              <label className="login-password-label">
                Password
              </label>
              <input
                className="login-password-input"
                type='password'
                name='password'
                onChange={(e) => {
                  e.preventDefault();
                  this.handlePassword(e);
                }}
                value={password}
              />
              <br/>
              <button
                className="login-submit-btn"
                onClick={(e) => {
                  e.preventDefault();
                  this.LoginUser();
                }}>
                Login
              </button>
            </form>
          </div>
      </div>
    ) :
    (
      <div>
        <Particles
          id="tile-1-particles"
          config="../../../src/utils/particles.json"
        />
          <div className="login-container">
            <h1 className="login-error-message">
              {errorMessage}
            </h1>
            <form>
              <label className="login-username-label">
                Username
              </label>
              <input
                className="login-username-input"
                type='text'
                name='username'
                onChange={(e) => {
                  e.preventDefault();
                  this.handleUsername(e);
                }}
                value={username}
              />
              <br/>
              <label className="login-email-label">
                Email
              </label>
              <input
                className="login-email-input"
                type="text"
                name="email"
                onChange={(e) => {
                  e.preventDefault();
                  this.handleEmail(e);
                }}
                value={email}
              />
              <br/>
              <label className="login-password-label">
                Password
              </label>
              <input
                className="login-password-input"
                type='password'
                name='password'
                onChange={(e) => {
                  e.preventDefault();
                  this.handlePassword(e);
                }}
                value={password}
              />
              <br/>
              <button
                className="login-submit-btn"
                onClick={(e) => {
                  e.preventDefault();
                  this.LoginUser();
                }}>
                Login
              </button>
            </form>
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { login } = state;
  const {
    username,
    email,
    password
  } = login;

  return {
    username,
    email,
    password,
  };
};


export default connect(mapStateToProps)(Login);
