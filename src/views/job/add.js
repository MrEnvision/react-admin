import React, { Component, Fragment } from 'react';
import FormComponent from '../../components/form';
import './../../styles/views/job.scss';
import { Detailed } from '../../api/job';

class JobAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      formConfig: {
        url: 'jobAdd',
        setFieldsValue: null,
        layout: {
          labelCol: { span: 2 },
          wrapperCol: { span: 20 },
        },
        tailLayout: {
          wrapperCol: { offset: 2 },
        },
        formatFormKey: 'parentId',
      },
      formItem: [
        {
          type: 'DynamicSelect',
          label: '部门名称',
          name: 'parentId',
          style: { width: '200px' },
          placeholder: '请选择部门名称',
          url: 'departmentList',
          propsKey: {
            value: 'id',
            label: 'name',
          },
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
      this.setState({
        formConfig: {
          ...this.state.formConfig,
          url: 'jobEdit',
          setFieldsValue: response.data.data,
        },
      });
    });
  };

  render() {
    const { formConfig, formItem, id } = this.state;
    return (
      <Fragment>
        <FormComponent
          formConfig={formConfig}
          formItem={formItem}
          id={id}
          idName="jobId"
        />
      </Fragment>
    );
  }
}

export default JobAdd;
