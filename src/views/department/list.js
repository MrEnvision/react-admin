import React, { Component, Fragment } from 'react';
import { Form, Input, Button, Table, Switch, message, Modal } from 'antd';
import { GetList, Delete, Status } from '../../api/department';
import './../../styles/views/department.scss';
import { Link } from 'react-router-dom';

class DepartmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyWork: '',
      pageNumber: 1,
      pageSize: 10,
      id: null,
      visible: false,
      confirmLoading: false,
      switchFlag: false,
      loadingTable: false,
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
                <Button onClick={() => this.deleteModal(rowData.id)}>
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
    if (this.state.loadingTable) {
      return false;
    }
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
    this.setState({ loadingTable: true });
    GetList({ pageNumber, pageSize, keyWork })
      .then((response) => {
        const responseData = response.data.data;
        this.setState({ loadingTable: false });
        if (responseData.data) {
          this.setState({ dataSource: responseData.data });
        }
      })
      .catch((error) => {
        this.setState({ loadingTable: false });
        console.log('error', error);
      });
  };

  // 删除数据modal
  deleteModal = (id) => {
    if (!id) {
      // 批量删除
      if (this.state.selectedRowKeys.length === 0) {
        return false;
      }
      id = this.state.selectedRowKeys.join();
    }
    this.setState({ visible: true, id });
  };

  // 删除数据
  deleteData = () => {
    this.setState({ confirmLoading: true });
    Delete({ id: this.state.id })
      .then((response) => {
        this.setState({
          visible: false,
          id: null,
          confirmLoading: false,
          selectedRowKeys: [],
        });
        message.info(response.data.message);
        this.loadData();
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

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

  render() {
    const { dataSource, columns, confirmLoading, loadingTable } = this.state;
    const rowSelection = {
      onChange: this.onCheckbox,
    };
    return (
      <Fragment>
        <Form layout="inline" onFinish={this.onFinish}>
          <Form.Item label="部门名称" name="name">
            <Input placeholder="请输入部门名称" />
          </Form.Item>
          <Form.Item>
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
            loading={loadingTable}
          />
          <Button onClick={() => this.deleteModal()}>批量删除</Button>
        </div>
        <Modal
          title="提示"
          okText="确认"
          cancelText="取消"
          visible={this.state.visible}
          onOk={this.deleteData}
          onCancel={() => {
            this.setState({ visible: false });
          }}
          confirmLoading={confirmLoading}
        >
          <p>确定删除此信息？删除后将无法恢复。</p>
        </Modal>
      </Fragment>
    );
  }
}

export default DepartmentList;
