import React, { Component, Fragment } from 'react';
import { TableList } from '../../api/table';
import requestUrl from '../../api/requestUrl';
import { Select } from 'antd';

class DynamicSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      dynamicSelectItem: [],
    };
  }

  componentDidMount() {
    if (this.props.config.url) {
      TableList({
        url: requestUrl[this.props.config.url],
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
