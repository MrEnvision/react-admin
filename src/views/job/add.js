// react + ant 依赖
import React, { Component, Fragment } from 'react';
import { Select } from 'antd';
// 接口
import { Detailed } from '../../apis/job';
import { TableList } from '../../apis/common';
import requestUrl from '../../apis/requestUrl';
// 组件
import FormComponent from '../../components/Form';

class JobAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      formConfig: {
        submitUrl: 'jobAdd',
        submitBtnText: '提交',
        setFieldsValue: null,
        layout: {
          labelCol: { span: 2 },
          wrapperCol: { span: 20 },
        },
        tailLayout: {
          wrapperCol: { offset: 2 },
        },
        formatFormKey: 'parentId',
        formItem: [
          {
            type: 'Slot',
            label: '部门名称',
            name: 'parentId',
            slotName: 'department',
          },
          {
            type: 'Input',
            label: '职位名称',
            name: 'jobName',
            style: { width: '200px' },
            placeholder: '请输入职位名称',
            rules: [{ required: true, message: '请输入职位名称!' }],
          },
          {
            type: 'Radio',
            label: '禁启用',
            name: 'status',
            rules: [{ required: true, message: '请选择禁启用!' }],
            options: [
              { label: '禁用', value: false },
              { label: '启用', value: true },
            ],
          },
          {
            type: 'TextArea',
            label: '描述',
            name: 'content',
            style: { width: '600px' },
            placeholder: '请输入描述',
            rows: 4,
          },
        ],
      },
      select: [],
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
    this.getSelectList();
  }

  getDetailed = () => {
    if (!this.state.id) {
      return false;
    }
    Detailed({ id: this.state.id }).then((response) => {
      this.setState({
        formConfig: {
          ...this.state.formConfig,
          submitUrl: 'jobEdit',
          setFieldsValue: response.data.data,
        },
      });
    });
  };

  getSelectList = () => {
    const data = {
      url: requestUrl['departmentList'],
      method: 'post',
      data: {
        pageNumber: 1,
        pageSize: 100,
      },
    };
    // 接口
    TableList(data).then((response) => {
      this.setState({
        select: response.data.data.data,
      });
    });
  };

  render() {
    const { formConfig, id, select } = this.state;
    return (
      <Fragment>
        <FormComponent formConfig={formConfig} id={id} idName="jobId">
          {/** 插槽 */}
          <Select
            ref="department"
            style={{ width: '200px' }}
            placeholder={'请选择部门名称'}
            value={select}
          >
            {this.state.select &&
              this.state.select.map((elem) => {
                return (
                  <Select.Option value={elem.id} key={elem.id}>
                    {elem.name}
                  </Select.Option>
                );
              })}
          </Select>
        </FormComponent>
      </Fragment>
    );
  }
}

export default JobAdd;
