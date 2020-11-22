import React, { Component } from 'react';
import AsideMenu from '../../components/asideMenu';
import { TeamOutlined } from '@ant-design/icons';

class Aside extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: this.props.collapsed,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    return { collapsed: nextProps.collapsed };
  }

  render() {
    return (
      <div className="aside">
        <div className="aside__logo">
          <TeamOutlined />
        </div>
        {this.state.collapsed ? null : (
          <h1 className="aside__title">人事管理系统</h1>
        )}
        <AsideMenu />
      </div>
    );
  }
}

export default Aside;
