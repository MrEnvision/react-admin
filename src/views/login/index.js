import React, { Component, Fragment } from 'react';
import './../../styles/views/login.scss';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formType: 'login',
    };
  }

  switchForm = (value) => {
    this.setState({
      formType: value,
    });
  };

  render() {
    return (
      <Fragment>
        {this.state.formType === 'login' ? (
          <LoginForm switchForm={this.switchForm} />
        ) : (
          <RegisterForm switchForm={this.switchForm} />
        )}
      </Fragment>
    );
  }
}

export default Login;
