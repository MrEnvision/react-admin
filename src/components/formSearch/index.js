import React, { Component } from 'react';
import { Button, Form, Input, InputNumber, Radio, Select } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  updateDepartmentList,
  updateDepartmentSearch,
  updateDepartmentTotal,
} from '../../store/action/department';
import requestUrl from '../../api/requestUrl';
import { TableList } from '../../api/table';
import DynamicSelect from '../dynamicSelect';

class FormSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      searchData: {},
    };
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
    // 格式化参数
    const paramsData = this.formatData(searchData);
    this.searchData(paramsData);
  };

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

  // 搜索数据
  searchData = (searchData) => {
    this.setState(
      {
        searchData,
      },
      () => {
        this.props.updateData.updateDepartmentSearch(searchData);
        this.loadData();
      }
    );
  };

  // 请求数据
  loadData = () => {
    const { searchData } = this.state;
    const requestData = {
      url: requestUrl[this.props.formConfig.url],
      data: {
        pageNumber: 1,
        pageSize: 10,
      },
    };
    // 筛选项的参数拼接
    if (Object.keys(searchData).length !== 0) {
      for (let key in searchData) {
        requestData.data[key] = searchData[key];
      }
    }
    TableList(requestData)
      .then((response) => {
        const responseData = response.data.data;
        if (responseData.data) {
          this.setState(
            {
              dataSource: responseData.data,
              total: responseData.total,
            },
            () => {
              this.props.updateData.updateDepartmentTotal(responseData.total);
              this.props.updateData.updateDepartmentList(responseData.data);
            }
          );
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
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

  // 动态Select元素
  dynamicSelectElem = (item) => {
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={[{ validator: this.validatorSelect }]}
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

const mapDispatchToProps = (dispatch) => ({
  updateData: bindActionCreators(
    {
      updateDepartmentList,
      updateDepartmentSearch,
      updateDepartmentTotal,
    },
    dispatch
  ),
});

export default connect(null, mapDispatchToProps)(FormSearch);
