import React, { Component } from 'react';
import { Detailed } from '../../api/department';
import FormComponent from '../../components/form';

class DepartmentAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      id: null,
      formConfig: {
        url: 'departmentAdd',
        initialValues: { number: 1, status: true },
        setFieldsValue: null,
        layout: {
          labelCol: { span: 2 },
          wrapperCol: { span: 20 },
        },
        tailLayout: {
          wrapperCol: { offset: 2 },
        },
      },
      formItem: [
        {
          type: 'Input',
          label: '部门名称',
          name: 'name',
          style: { width: '200px' },
          placeholder: '请输入部门名称',
          rules: [{ required: true, message: '请输入部门名称!' }],
        },
        {
          type: 'InputNumber',
          label: '人员数量',
          name: 'number',
          style: { width: '200px' },
          placeholder: '请输入人员数量',
          rules: [{ required: true, message: '请输入人员数量!' }],
          min: 0,
          max: 100,
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
          url: 'departmentEdit',
          setFieldsValue: response.data.data,
        },
      });
    });
  };

  // onHandlerSubmit = (values) => {
  //   // 确定按钮执行添加或编辑
  //   this.state.id ? this.onHandlerEdit(values) : this.onHandlerAdd(values);
  // };
  //
  // // 添加
  // onHandlerAdd = (values) => {
  //   Add(values)
  //     .then((response) => {
  //       const data = response.data;
  //       message.info(data.message);
  //       this.setState({
  //         loading: false,
  //       });
  //     })
  //     .catch((error) => {
  //       this.setState({
  //         loading: false,
  //       });
  //       console.log("error", error);
  //     });
  // };
  //
  // // 编辑
  // onHandlerEdit = (values) => {
  //   const requestData = values;
  //   requestData.id = this.state.id;
  //   Edit(requestData)
  //     .then((response) => {
  //       message.info(response.data.message);
  //       this.setState({ loading: false });
  //     })
  //     .catch((error) => {
  //       this.setState({ loading: false });
  //       console.log("error", error);
  //     });
  // };

  render() {
    const { formConfig, formItem, id } = this.state;
    return (
      <FormComponent
        formConfig={formConfig}
        formItem={formItem}
        id={id}
        // submit={this.onHandlerSubmit}
      />
    );
  }
}

export default DepartmentAdd;
