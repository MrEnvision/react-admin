// react + ant 依赖
import React, { Component, Fragment } from 'react';
import { Select } from 'antd';
// 接口
import { TableList } from '../../apis/common';
import requestUrl from '../../apis/requestUrl';

class DynamicSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      dynamicSelectItem: [],
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // 1、静态的，无法获取 this.state，2、必须有返回
    let { value } = nextProps;
    let { name } = nextProps.config;
    if (!value) {
      return false;
    }
    // 判断是否是JSON对象
    if (Object.prototype.toString.call(value) === '[object Object]') {
      value = value[name];
    }
    if (value !== prevState.value) {
      return {
        value: value,
      };
    }
    // 直接放在最后面
    return null;
  }

  componentDidMount() {
    if (this.props.config.initUrl) {
      TableList({
        url: requestUrl[this.props.config.initUrl],
        method: 'post',
        data: {
          pageNumber: 1,
          pageSize: 100,
        },
      }).then((response) => {
        this.setState({
          dynamicSelectItem: response.data.data.data,
        });
      });
    }
  }

  onValueChange = (value) => {
    this.setState({ value });
    this.triggerChange(value);
  };

  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange({ [this.props.config.name]: changedValue });
    }
  };

  render() {
    const { style, placeholder, propsKey } = this.props.config;
    const { dynamicSelectItem } = this.state;
    return (
      <Fragment>
        <Select
          style={style}
          placeholder={placeholder}
          onChange={this.onValueChange}
          value={this.state.value}
        >
          {dynamicSelectItem &&
            dynamicSelectItem.map((elem) => {
              return (
                <Select.Option
                  value={elem[propsKey.value]}
                  key={elem[propsKey.value]}
                >
                  {elem[propsKey.label]}
                </Select.Option>
              );
            })}
        </Select>
      </Fragment>
    );
  }
}

export default DynamicSelect;
