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

  render() {
    return (
      <div className={'form'}>
        <div className={'form__header'}>
          <h4 className={'form__header--main'}>注册</h4>
          <span className={'form__header--sub'} onClick={this.toggleForm}>
            登录
          </span>
        </div>
        <Form name="registerForm" className="form__content">
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item
            name="repeatPassword"
            rules={[{ required: true, message: '请再次输入密码!' }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="再次输入密码"
            />
          </Form.Item>
          <Form.Item name="code">
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
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default RegisterForm;
