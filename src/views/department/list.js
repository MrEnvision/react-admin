import React, { Component, Fragment } from 'react';
import { Form, Input, Button, Table, Switch, message } from 'antd';
import { GetList, Delete } from '../../api/department';
import './../../styles/views/department.scss';

class DepartmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyWork: '',
      pageNumber: 1,
      pageSize: 10,
      selectedRowKeys: [],
      dataSource: [],
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
                <Button type="primary">编辑</Button>
                <Button onClick={() => this.deleteData(rowData.id)}>
                  删除
                </Button>
              </div>
            );
          },
        },
      ],
    };
  }

  // 初始获取数据
  componentDidMount() {
    this.loadData();
  }

  // 复选框
  onCheckbox = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  // 点击搜索
  onFinish = (values) => {
    this.setState({
      keyWork: values.name,
      pageNumber: 1,
      pageSize: 10,
    });
    this.loadData();
  };

  // 请求数据
  loadData = () => {
    const { pageNumber, pageSize, keyWork } = this.state;
    console.log(this.state);
    GetList({ pageNumber, pageSize, keyWork })
      .then((response) => {
        const responseData = response.data.data;
        if (responseData.data) {
          this.setState({
            dataSource: responseData.data,
          });
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  // 删除数据
  deleteData = (id) => {
    Delete({ id })
      .then((response) => {
        message.info(response.data.message);
        this.loadData();
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  render() {
    const { dataSource, columns } = this.state;
    const rowSelection = {
      onChange: this.onCheckbox,
    };
    return (
      <Fragment>
        <Form layout="inline" onFinish={this.onFinish}>
          <Form.Item label="部门名称" name="name" fieldContext="">
            <Input placeholder="请输入部门名称" />
          </Form.Item>
          <Form.Item fieldContext="">
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>
        <div className="table-wrap">
          <Table
            dataSource={dataSource}
            columns={columns}
            rowSelection={rowSelection}
            rowKey="id"
            bordered
            size="middle"
          />
        </div>
      </Fragment>
    );
  }
}

export default DepartmentList;
