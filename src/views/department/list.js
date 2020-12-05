import React, { Component, Fragment } from 'react';
import { Button, Switch, message } from 'antd';
import { Status } from '../../api/department';
import './../../styles/views/department.scss';
import { Link } from 'react-router-dom';
import TableComponent from '../../components/table';

class DepartmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 需要操作的item
      id: null,
      // 防止switch连续触发
      switchFlag: false,
      // 表单配置
      tableConfig: {
        url: 'departmentList',
        deleteUrl: 'departmentDelete',
        multiSelect: true,
        rowKey: 'id',
        columns: [
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
                  defaultChecked={rowData.status === '1'}
                  onChange={() => this.onHandlerSwitch(rowData)}
                />
              );
            },
          },
          { title: '人员数量', dataIndex: 'number', key: 'number' },
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
                        pathname: '/index/department/add',
                        state: { id: rowData.id },
                      }}
                    >
                      编辑
                    </Link>
                  </Button>
                  <Button onClick={() => this.onHandlerDelete(rowData.id)}>
                    删除
                  </Button>
                </div>
              );
            },
          },
        ],
        formItem: [
          {
            type: 'Input',
            label: '部门名称',
            name: 'name',
            style: { width: '180px' },
            placeholder: '请输入部门名称',
          },
          {
            type: 'Select',
            label: '禁启用',
            name: 'status',
            style: { width: '100px' },
            options: [
              { label: '禁用', value: false },
              { label: '启用', value: true },
            ],
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
      id: data.id,
      status: data.status !== '1',
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
    const { tableConfig } = this.state;
    return (
      <Fragment>
        <TableComponent
          tableConfig={tableConfig}
          onRef={this.getChildRef}
          batchDelete={true}
        />
      </Fragment>
    );
  }
}

export default DepartmentList;
