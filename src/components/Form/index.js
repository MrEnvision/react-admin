// react + ant 依赖
import React, { Component } from 'react';
import { Button, Form, Input, InputNumber, Radio, message, Select } from 'antd';
// 接口
import requestUrl from '../../apis/requestUrl';
import { FormSubmit } from '../../apis/common';
// 组件
import DynamicSelect from '../DynamicSelect';

class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    this.refs.form.setFieldsValue(nextProps.formConfig.setFieldsValue);
  }

  // 初始化form-item
  initFormItem = () => {
    const { formItem } = this.props.formConfig;
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
      } else if (item.type === 'DynamicSelect') {
        return this.dynamicSelectElem(item);
      } else if (item.type === 'Slot') {
        return this.slotElem(item);
      } else {
        return null;
      }
    });
  };

  // 提交表单
  onFinish = (values) => {
    // 格式化参数
    const paramsData = this.formatData(values);
    // 如果有传入submit方法则调用传入的submit方法
    if (this.props.submit) {
      this.props.submit(paramsData);
      return true;
    }
    // 如果没有传入submit方法则调用统一的方法
    const data = {
      url: requestUrl[this.props.formConfig.submitUrl],
      data: paramsData,
    };
    // 如果传入id则添加id
    if (this.props.id) {
      const idName = this.props.idName || 'id';
      data.data[idName] = this.props.id;
    }
    this.setState({ loading: true });
    FormSubmit(data)
      .then((response) => {
        const responseData = response.data;
        message.info(responseData.message);
        this.setState({ loading: false });
        // // 重置表单
        // this.refs.form.resetFields();
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log('error', error);
      });
  };

  // 格式化参数
  formatData = (values) => {
    // 深拷贝
    const requestData = JSON.parse(JSON.stringify(values));
    const { formatFormKey } = this.props.formConfig;
    const keyValue = requestData[formatFormKey];
    if (Object.prototype.toString.call(keyValue) === '[object Object]') {
      requestData[formatFormKey] = keyValue[formatFormKey];
    }
    return requestData;
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

  // slot元素
  slotElem = (item) => {
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={item.rules}
      >
        {this.props.children && Array.isArray(this.props.children)
          ? this.props.children.filter((elem) => elem.ref === item.slotName)
          : this.props.children}
      </Form.Item>
    );
  };

  // 动态Select元素
  dynamicSelectElem = (item) => {
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={
          item.required === true ? [{ validator: this.validatorSelect }] : null
        }
        className={item.required === true ? 'required-icon' : ''}
      >
        <DynamicSelect config={item} />
      </Form.Item>
    );
  };

  validatorSelect = (rule, value) => {
    if (value) {
      return Promise.resolve();
    }
    return Promise.reject('请选择部门名称!');
  };

  render() {
    const {
      layout,
      formLayout,
      tailLayout,
      initialValues,
      submitBtnText,
    } = this.props.formConfig;
    return (
      <Form
        ref="form"
        {...layout}
        layout={formLayout}
        initialValues={initialValues}
        onFinish={this.onFinish}
      >
        {this.initFormItem()}
        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: '100px' }}
            loading={this.state.loading}
          >
            {submitBtnText}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default FormComponent;
