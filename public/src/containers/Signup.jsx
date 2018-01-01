import React, { Component } from 'react';
import { signupUser } from '../actions/auth';
import { inputUsername, inputEmail, inputPassword } from '../actions/login';
import { connect } from 'react-redux';


class Signup extends Component {
  constructor(props) {
    super(props);

    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.SignupUser = this.SignupUser.bind(this);
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

  SignupUser(){
    const {
      username,
      password,
      email,
      history,
      dispatch
    } = this.props;

    if (password.length > 5) {
      dispatch(
        signupUser(
          {
            username,
            email,
            password
          },
          history
        )
      );
    } else {
      console.log('password not long enough');
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
        <form>
          Username:<input
            type='text'
            name='username'
            onChange={(e) => {
              e.preventDefault();
              this.handleUsername(e);
            }}
            value={username}
          />
          <br />
          Email:<input
            type='text'
            name='email'
            onChange={(e) => {
              e.preventDefault();
              this.handleEmail(e);
            }}
            value={email}
          />
          <br />
          Password:<input
            type='text'
            name='password'
            onChange={(e) => {
              e.preventDefault();
              this.handlePassword(e);
            }}
            value={password}
          />
          <br />
          <button
            onClick={(e) => {
              e.preventDefault();
              this.SignupUser();
            }}>
            Submit
          </button>
        </form>
      </div>
    ) :
    (
      <div>
        <h1>
          {errorMessage}
        </h1>
        <form>
          Username:<input
            type='text'
            name='username'
            onChange={(e) => {
              e.preventDefault();
              this.handleUsername(e);
            }}
            value={username}
          />
          <br />
          Email:<input
            type='text'
            name='email'
            onChange={(e) => {
              e.preventDefault();
              this.handleEmail(e);
            }}
            value={email}
          />
          <br />
          Password:<input
            type='text'
            name='password'
            onChange={(e) => {
              e.preventDefault();
              this.handlePassword(e);
            }}
            value={password}
          />
          <br />
          <button
            onClick={(e) => {
              e.preventDefault();
              this.SignupUser();
            }}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const { signup } = state;
  const {
    username,
    email,
    password
  } = signup;

  return {
    username,
    email,
    password,
  };
};

export default connect(mapStateToProps)(Signup);
