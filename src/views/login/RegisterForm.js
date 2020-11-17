import React, { Component } from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toggleForm = () => {
    this.props.switchForm('login');
  };

  // 提交表单
  onFinish = (values) => {
    console.log(values);
  };

  render() {
    return (
      <div className={'form'}>
        <div className={'form__header'}>
          <h4 className={'form__header--main'}>注册</h4>
          <span className={'form__header--sub'} onClick={this.toggleForm}>
            登录
          </span>
        </div>
        <Form
          name="registerForm"
          className="form__content"
          onFinish={this.onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: '请先输入邮箱！' },
              { type: 'email', message: '邮箱格式不正确' },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="邮箱" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码！' },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  let repeat_password_value = getFieldValue('repeatPassword'); // 获取再次输入密码的值
                  if (
                    !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(value)
                  ) {
                    return Promise.reject('密码为6-20位的字母或数字！');
                  }
                  if (
                    repeat_password_value &&
                    value !== repeat_password_value
                  ) {
                    return Promise.reject('两次密码不一致!');
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item
            name="repeatPassword"
            rules={[
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (value !== getFieldValue('password')) {
                    return Promise.reject('两次密码不一致');
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="再次输入密码"
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
                <Input prefix={<SafetyOutlined />} placeholder="验证码" />
              </Col>
              <Col span={9}>
                <Button type="danger" className="login-form-button">
                  获取验证码
                </Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="form__content--button"
            >
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default RegisterForm;
