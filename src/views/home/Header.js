import React, { Component } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: this.props.collapsed,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    return { collapsed: nextProps.collapsed };
  }

  toggleMenu = () => {
    this.props.toggleMenu();
  };

  render() {
    return (
      <div className="header">
        <span className="collapsed-icon" onClick={this.toggleMenu}>
          {this.state.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </span>
      </div>
    );
  }
}

export default Header;
