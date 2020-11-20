import React, { Component } from 'react';
import { Button, Col, Form, Input, Row, message } from 'antd';
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons';
import CodeButton from '../../components/login/CodeButton';
import { Login } from '../../api/account';
import { setToken } from '../../utils/token';
import CryptoJs from 'crypto-js';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'sw@qq.com',
      password: '',
      code: '',
      submit_button_loading: false,
    };
  }

  // 跳转至注册
  toggleForm = () => {
    this.props.switchForm('register');
  };

  // 输入绑定
  inputChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  inputChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  inputChangeCode = (e) => {
    this.setState({
      code: e.target.value,
    });
  };

  // 提交表单
  onFinish = (values) => {
    const requestData = {
      username: values.username,
      code: values.code,
      password: CryptoJs.MD5(values.password).toString(),
    };
    this.setState({
      submit_button_loading: true,
    });
    Login(requestData)
      .then((response) => {
        this.setState({
          submit_button_loading: false,
        });
        const data = response.data;
        if (data.resCode !== 0) {
          message.error(data.message);
          return false;
        }
        setToken(data.data.token);
        this.props.history.push('/index');
        message.success('登录成功！');
      })
      .catch((error) => {
        this.setState({
          submit_button_loading: false,
        });
        console.log(error);
      });
  };

  render() {
    const { username, submit_button_loading } = this.state;
    return (
      <div className="form">
        <div className="form__header">
          <h4 className={'form__header--main'}>登录</h4>
          <span className={'form__header--sub'} onClick={this.toggleForm}>
            账号注册
          </span>
        </div>
        <Form
          name="loginForm"
          className="form__content"
          onFinish={this.onFinish}
          initialValues={{
            username: 'sw@qq.com',
            password: '1234sw',
          }}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: '请输入邮箱!' },
              { type: 'email', message: '邮箱格式不正确！' },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="邮箱"
              onChange={this.inputChangeUsername}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码!' },
              {
                pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
                message: '密码为6-20位的字母或数字！',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="密码"
              onChange={this.inputChangePassword}
            />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              { required: true, message: '请输入验证码！' },
              { len: 6, message: '验证码为6位！' },
            ]}
          >
            <Row gutter={16}>
              <Col span={15}>
                <Input
                  prefix={<SafetyOutlined />}
                  placeholder="验证码"
                  onChange={this.inputChangeCode}
                />
              </Col>
              <Col span={9}>
                <CodeButton username={username} module="login" />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="form__content--button"
              loading={submit_button_loading}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default LoginForm;
