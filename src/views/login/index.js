// react + ant 依赖
import React, { Component, Fragment } from 'react';
// 样式
import './../../styles/views/login.scss';
// 组件
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
