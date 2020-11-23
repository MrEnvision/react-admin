import React, { Component } from 'react';
import { Button, message } from 'antd';
import { GetCode } from '../../api/account';

let timer;

class CodeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      module: props.module,
      button_text: '获取验证码',
      button_loading: false,
    };
  }

  // 更新props的时候同步更新username
  static getDerivedStateFromProps(nextProps) {
    return { username: nextProps.username };
  }

  // 组件销毁生命周期
  componentWillUnmount() {
    clearInterval(timer);
  }

  // 获取验证码
  getCode = () => {
    if (!this.state.username) {
      message.warning('请先输入邮箱！');
      return false;
    }
    const requestData = {
      username: this.state.username,
      module: this.state.module,
    };

    this.setState({
      button_text: '发送中',
      button_loading: true,
    });

    GetCode(requestData)
      .then((response) => {
        message.success(response.data.message);
        this.countDown();
      })
      .catch((error) => {
        this.setState({
          button_loading: false,
          button_text: '重新获取',
        });
        console.log('error', error);
      });
  };

  // 执行倒计时
  countDown = () => {
    let count = 5;
    this.setState({
      button_text: `${count}s`,
    });
    timer = setInterval(() => {
      count -= 1;
      if (count > 0) {
        this.setState({
          button_text: `${count}s`,
        });
      } else {
        this.setState({
          button_loading: false,
          button_text: '重新获取',
        });
        clearInterval(timer);
      }
    }, 1000);
  };

  render() {
    const { button_text, button_loading } = this.state;
    return (
      <Button
        type="danger"
        className="code-button"
        loading={button_loading}
        onClick={this.getCode}
      >
        {button_text}
      </Button>
    );
  }
}

export default CodeButton;
