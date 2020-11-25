import React, { Component, Fragment } from 'react';
import { Form, Input, InputNumber, Radio, Button, message } from 'antd';
import { Add, Detailed } from '../../api/department';

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 2 },
};

class DepartmentAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      id: null,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.location.state) {
      return { id: nextProps.location.state.id };
    }
    return null;
  }

  componentDidMount() {
    this.getDetailed();
  }

  getDetailed = () => {
    if (!this.state.id) {
      return false;
    }
    Detailed({ id: this.state.id }).then((response) => {
      this.refs.form.setFieldsValue(response.data.data);
    });
  };

  onFinish = (values) => {
    if (!values.name) {
      message.error('部门名称不能为空');
      return false;
    }
    if (!values.number || values.number === 0) {
      message.error('人员数量不能为0');
      return false;
    }
    if (!values.content) {
      message.error('描述不能为空');
      return false;
    }
    Add(values)
      .then((response) => {
        const data = response.data;
        message.info(data.message);
        this.setState({
          loading: false,
        });
        // 重置表单
        this.refs.form.resetFields();
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
        console.log('error', error);
      });
  };

  render() {
    return (
      <Fragment>
        <Form
          ref="form"
          {...layout}
          initialValues={{ number: 1, status: true }}
          onFinish={this.onFinish}
        >
          <Form.Item label="部门名称" name="name">
            <Input style={{ width: '200px' }} />
          </Form.Item>
          <Form.Item label="人员数量" name="number">
            <InputNumber style={{ width: '200px' }} min={1} />
          </Form.Item>
          <Form.Item label="禁启用" name="status">
            <Radio.Group>
              <Radio value={true}>启用</Radio>
              <Radio value={false}>禁用</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="描述" name="content">
            <Input.TextArea rows={4} style={{ width: '600px' }} />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100px' }}
              loading={this.state.loading}
            >
              提交
            </Button>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

export default DepartmentAdd;
