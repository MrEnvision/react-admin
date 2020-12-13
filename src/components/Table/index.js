// 容器组件
// react + ant 依赖
import React, { Component, Fragment } from 'react';
import { Modal, message } from 'antd';
// 接口
import requestUrl from '../../apis/requestUrl';
import { TableList, TableDelete } from '../../apis/common';
// 组件
import FormComponent from '../Form';
import TableBasis from './table';

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 请求参数
      pageNumber: 1,
      pageSize: 10,
      searchData: {},
      // 加载提示
      loadingTable: false,
      // 分页
      defaultPageSize: 10,
      // 批量选择
      selectedRowKeys: [],
      // modal显示
      visible: false,
      confirmLoading: false,
      // 选定item
      id: null,
    };
  }

  // 初始化
  componentDidMount() {
    this.loadData();
    this.props.onRef && this.props.onRef(this); // 返回子组件实例
  }

  // 请求数据
  loadData = () => {
    const { pageNumber, pageSize, searchData } = this.state;
    this.setState({ loadingTable: true });
    const requestData = {
      url: requestUrl[this.props.tableConfig.url],
      data: {
        pageNumber: pageNumber,
        pageSize: pageSize,
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
        this.setState({ loadingTable: false });
        if (responseData.data) {
          this.setState({
            dataSource: responseData.data,
            total: responseData.total,
          });
        }
      })
      .catch((error) => {
        this.setState({ loadingTable: false });
        console.log('error', error);
      });
  };

  // 搜索数据
  searchData = (searchData) => {
    if (this.state.loadingTable) {
      return false;
    }
    this.setState(
      {
        pageNumber: 1,
        pageSize: 10,
        searchData,
      },
      () => {
        this.loadData();
      }
    );
  };

  // 删除弹框
  deleteModal = (id) => {
    if (!id) {
      // 批量删除
      if (this.state.selectedRowKeys.length === 0) {
        message.info('请先选择需要删除的数据！');
        return false;
      }
      id = this.state.selectedRowKeys.join();
    }
    this.setState({ visible: true, id });
  };

  // 删除数据
  deleteData = () => {
    this.setState({ confirmLoading: true });
    TableDelete({
      data: {
        id: this.state.id,
      },
      url: requestUrl[this.props.tableConfig.deleteUrl],
    })
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
  // 复选框
  onCheckbox = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  // 分页选择
  onChangeCurrentPage = (value) => {
    this.setState(
      {
        pageNumber: value,
      },
      () => {
        this.loadData();
      }
    );
  };

  render() {
    const {
      dataSource,
      loadingTable,
      defaultPageSize,
      pageNumber,
      confirmLoading,
    } = this.state;
    const { columns, rowKey, multiSelect } = this.props.tableConfig;
    const rowSelection = {
      onChange: this.onCheckbox,
    };
    return (
      <Fragment>
        <FormComponent
          formConfig={this.props.tableConfig.formConfig}
          submit={this.searchData}
        />
        <TableBasis
          dataSource={dataSource}
          columns={columns}
          rowSelection={multiSelect ? rowSelection : null}
          rowKey={rowKey || 'id'}
          loading={loadingTable}
          pagination={false}
          onHandlerDelete={() => this.deleteModal()}
          total={this.state.total}
          defaultPageSize={defaultPageSize}
          onChangeCurrentPage={this.onChangeCurrentPage}
          current={pageNumber}
        />
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

export default TableComponent;
