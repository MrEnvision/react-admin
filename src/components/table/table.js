// UI组件
import React, { Fragment } from 'react';
import { Button, Col, Pagination, Row, Table } from 'antd';
import PropTypes from 'prop-types';

function TableBasis(props) {
  const {
    dataSource,
    columns,
    rowSelection,
    rowKey,
    loadingTable,
    batchDelete,
    onHandlerDelete,
    total,
    defaultPageSize,
    onChangeCurrentPage,
    current,
  } = props;
  return (
    <Fragment>
      <Table
        size="middle"
        className="margin-top-30"
        dataSource={dataSource}
        columns={columns}
        rowSelection={rowSelection}
        rowKey={rowKey}
        loading={loadingTable}
        pagination={false}
        bordered
      />
      <Row className="margin-top-30">
        <Col span={8}>
          {batchDelete && <Button onClick={onHandlerDelete}>批量删除</Button>}
        </Col>
        <Col span={16}>
          <Pagination
            className="float-right"
            total={total}
            showTotal={(total) => `总共 ${total} 条`}
            defaultPageSize={defaultPageSize}
            onChange={onChangeCurrentPage}
            current={current}
          />
        </Col>
      </Row>
    </Fragment>
  );
}

// 校验数据类型
TableBasis.propTypes = {
  columns: PropTypes.array,
  dataSource: PropTypes.array,
  total: PropTypes.number,
  changePageCurrent: PropTypes.func,
  changePageSize: PropTypes.func,
  batchDelete: PropTypes.bool,
  rowSelection: PropTypes.object,
  rowKey: PropTypes.string,
};

// 默认
TableBasis.defaultProps = {
  column: [],
  dataSource: [],
  total: 0,
  batchDelete: true,
  rowKey: 'id',
  pageNumber: 1,
  loadingTable: false,
  rowSelection: [],
  defaultPageSize: 0,
};

export default TableBasis;
