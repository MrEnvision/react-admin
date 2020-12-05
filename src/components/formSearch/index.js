import React, { Component } from 'react';
import { Button, Form, Input, InputNumber, Radio, Select } from 'antd';

class FormSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  // 初始化form-item
  initFormItem = () => {
    const { formItem } = this.props;
    if (!formItem || (formItem && formItem.length === 0)) {
      return null;
    }
    return formItem.map((item) => {
      if (item.type === 'Input') {
        return this.inputElem(item);
      } else if (item.type === 'InputNumber') {
        return this.inputNumberElem(item);
      } else if (item.type === 'Radio') {
        return this.radioElem(item);
      } else if (item.type === 'TextArea') {
        return this.textAreaElem(item);
      } else if (item.type === 'Select') {
        return this.selectElem(item);
      } else {
        return null;
      }
    });
  };

  // 提交表单
  onFinish = (values) => {
    const searchData = {};
    for (let key in values) {
      if (values[key] !== undefined && values[key] !== '') {
        searchData[key] = values[key];
      }
    }
    this.props.searchData(searchData);
  };

  // input元素
  inputElem = (item) => {
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={item.rules}
      >
        <Input style={item.style} placeholder={item.placeholder} />
      </Form.Item>
    );
  };

  // inputNumber元素
  inputNumberElem = (item) => {
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={item.rules}
      >
        <InputNumber style={item.style} min={item.min} max={item.max} />
      </Form.Item>
    );
  };

  // radio元素
  radioElem = (item) => {
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={item.rules}
      >
        <Radio.Group>
          {item.options &&
            item.options.map((elem) => {
              return (
                <Radio value={elem.value} key={elem.value}>
                  {elem.label}
                </Radio>
              );
            })}
        </Radio.Group>
      </Form.Item>
    );
  };

  // TextArea元素
  textAreaElem = (item) => {
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={item.rules}
      >
        <Input.TextArea rows={item.rows} style={item.style} />
      </Form.Item>
    );
  };

  // Select元素
  selectElem = (item) => {
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={item.rules}
      >
        <Select style={item.style} placeholder={item.placeholder}>
          {item.options &&
            item.options.map((elem) => {
              return (
                <Select.Option value={elem.value} key={elem.value}>
                  {elem.label}
                </Select.Option>
              );
            })}
        </Select>
      </Form.Item>
    );
  };

  render() {
    return (
      <Form ref="form" layout="inline" onFinish={this.onFinish}>
        {this.initFormItem()}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={this.state.loading}>
            搜索
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default FormSearch;
