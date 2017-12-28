import React, { Component } from 'react';
import { loginUser } from '../actions/auth';
import { inputUsername, inputEmail, inputPassword } from '../actions/login';
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
    const { errorMessage, username, email, password } = this.props;
    return errorMessage === undefined || errorMessage.length < 0 ? (
      <div>
        <form>
          <label>Username:</label>
          <input
            type='text'
            name='username'
            onChange={(e) => {
              e.preventDefault();
              this.handleUsername(e)
            }}
            value={username}
          />
          <br/>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            onChange={(e) => {
              e.preventDefault();
              this.handleEmail(e)
            }}
            value={email}
          />
          <br/>
          <label>Password:</label>
          <input
            type='text'
            name='password'
            onChange={(e) => {
              e.preventDefault();
              this.handlePassword(e)
            }}
            value={password}
          />
          <br/>
          <button
            onClick={(e) => {
              e.preventDefault();
              this.LoginUser()
            }}
          >Submit</button>
        </form>
      </div>
    ) :
    (
      <div>
        <h1>{errorMessage}</h1>
        <form>
          <label>Username:</label>
          <input
            type='text'
            name='username'
            onChange={(e) => {
              e.preventDefault();
              this.handleUsername(e)
            }}
            value={username}
          />
          <br />
          <label>Email:</label>
          <input
            type="text"
            name="email"
            onChange={(e) => {
              e.preventDefault();
              this.handleEmail(e)
            }}
            value={email}
          />
          <br/>
          <label>Password:</label>
          <input
            type='text'
            name='password'
            onChange={(e) => {
              e.preventDefault();
              this.handlePassword(e)
            }}
            value={password}
          />
          <br />
          <button
            onClick={(e) => {
              e.preventDefault();
              this.LoginUser()
            }}>Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { login } = state;
  const { username, email, password } = login;
  return {
    username,
    email,
    password,
  };
};


export default connect(mapStateToProps)(Login);
