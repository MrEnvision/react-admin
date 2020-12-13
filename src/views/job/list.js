import React, { Component, Fragment } from 'react';
import FormSearch from '../../components/formSearch';
import TableComponent from '../../components/table';
import { Button, message, Switch } from 'antd';
import { Status } from '../../api/job';
import { Link } from 'react-router-dom';

class JobList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 防止switch连续触发
      switchFlag: false,
      tableConfig: {
        url: 'jobList',
        deleteUrl: 'jobDelete',
        multiSelect: true,
        rowKey: 'jobId',
        columns: [
          { title: '职位名称', dataIndex: 'jobName', key: 'jobName' },
          { title: '部门名称', dataIndex: 'name', key: 'name' },
          {
            title: '禁启用',
            dataIndex: 'status',
            key: 'status',
            render: (text, rowData) => {
              return (
                <Switch
                  checkedChildren="启用"
                  unCheckedChildren="禁用"
                  defaultChecked={rowData.status === true}
                  onChange={() => this.onHandlerSwitch(rowData)}
                />
              );
            },
          },
          {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (text, rowData) => {
              return (
                <div className="inline-button">
                  <Button type="primary">
                    <Link
                      to={{
                        pathname: '/index/job/add',
                        state: { id: rowData.jobId },
                      }}
                    >
                      编辑
                    </Link>
                  </Button>
                  <Button onClick={() => this.onHandlerDelete(rowData.jobId)}>
                    删除
                  </Button>
                </div>
              );
            },
          },
        ],
      },
      formConfig: {
        url: 'jobList',
        formatFormKey: 'name',
        formItem: [
          {
            type: 'DynamicSelect',
            label: '部门名称',
            name: 'parentId',
            style: { width: '180px' },
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
            style: { width: '180px' },
            placeholder: '请输入职位名称',
          },
        ],
      },
    };
  }

  // 禁启用
  onHandlerSwitch = (data) => {
    if (this.state.switchFlag) {
      return false;
    }
    this.setState({ switchFlag: true });
    Status({
      id: data.jobId,
      status: data.status !== true,
    })
      .then((response) => {
        this.setState({ switchFlag: false });
        message.info(response.data.message);
      })
      .catch((error) => {
        this.setState({ switchFlag: false });
        console.log('error', error);
      });
  };

  // 获取子组件实例
  getChildRef = (ref) => {
    this.tableComponent = ref; // 存储子组件
  };

  // 删除
  onHandlerDelete = (id) => {
    this.tableComponent.deleteModal(id);
  };

  render() {
    const { tableConfig, formConfig } = this.state;
    return (
      <Fragment>
        <FormSearch formConfig={formConfig} />
        <TableComponent
          tableConfig={tableConfig}
          onRef={this.getChildRef}
          batchDelete={true}
        />
      </Fragment>
    );
  }
}

export default JobList;
