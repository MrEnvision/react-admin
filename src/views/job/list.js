// react + ant 依赖
import React, { Component, Fragment } from 'react';
import { Button, message, Switch } from 'antd';
import { Link } from 'react-router-dom';
// 接口
import { Status } from '../../apis/job';
// 组件
import TableComponent from '../../components/Table';

class JobList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 需要操作的item
      id: null,
      // 防止switch连续触发
      switchFlag: false,
      // 表单配置
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
        formConfig: {
          formLayout: 'inline',
          submitUrl: 'jobList',
          submitBtnText: '搜索',
          formatFormKey: 'parentId',
          formItem: [
            {
              type: 'DynamicSelect',
              label: '部门名称',
              name: 'parentId',
              style: { width: '180px' },
              placeholder: '请选择部门名称',
              initUrl: 'departmentList',
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
      },
    };
  }

  // 获取子组件实例
  getChildRef = (ref) => {
    this.tableComponent = ref; // 存储子组件
  };

  // 删除
  onHandlerDelete = (id) => {
    this.tableComponent.deleteModal(id);
  };

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

  render() {
    const { tableConfig } = this.state;
    return (
      <Fragment>
        <TableComponent tableConfig={tableConfig} onRef={this.getChildRef} />
      </Fragment>
    );
  }
}

export default JobList;
