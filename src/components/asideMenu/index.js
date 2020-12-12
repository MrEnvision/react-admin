import React, { Component, Fragment } from 'react';
import { Menu } from 'antd';
import Router from './../../router/index';
import { Link, withRouter } from 'react-router-dom';
import {
  UserOutlined,
  DashboardOutlined,
  TeamOutlined,
  ContactsOutlined,
} from '@ant-design/icons';

class AsideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: [],
    };
  }

  componentDidMount() {
    const pathname = this.props.location.pathname;
    const menuKey = pathname.split('/').slice(0, 3).join('/');
    this.setState({
      openKeys: [menuKey],
    });
  }

  // 选择菜单
  selectMenu = ({ keyPath }) => {
    this.setState({
      openKeys: [keyPath[keyPath.length - 1]],
    });
  };

  // 打开菜单
  openMenu = (openKeys) => {
    this.setState({
      openKeys: [openKeys[openKeys.length - 1]],
    });
  };

  // icon 渲染
  getIcon = (icon) => {
    if (icon === 'DashboardOutlined') {
      return <DashboardOutlined />;
    } else if (icon === 'UserOutlined') {
      return <UserOutlined />;
    } else if (icon === 'TeamOutlined') {
      return <TeamOutlined />;
    } else if (icon === 'ContactsOutlined') {
      return <ContactsOutlined />;
    }
  };

  // 无子级菜单处理
  renderMenu = (item) => {
    return (
      <Menu.Item key={item.path} icon={this.getIcon(item.icon)}>
        <Link to={item.path}>
          <span>{item.title}</span>
        </Link>
      </Menu.Item>
    );
  };

  // 子级菜单处理
  renderSubMenu = (item) => {
    return (
      <Menu.SubMenu
        key={item.path}
        title={item.title}
        icon={this.getIcon(item.icon)}
      >
        {item.child &&
          item.child.map((subItem) => {
            return subItem.child && subItem.child.length > 0
              ? this.renderSubMenu(subItem)
              : this.renderMenu(subItem);
          })}
      </Menu.SubMenu>
    );
  };

  render() {
    return (
      <Fragment>
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={['/index']}
          defaultOpenKeys={[]}
          selectedKeys={[this.props.history.location.pathname]}
          // selectedKeys={this.state.selectedKeys}
          openKeys={this.state.openKeys}
          onOpenChange={this.openMenu}
          onClick={this.selectMenu}
        >
          {Router &&
            Router.map((firstItem) => {
              return firstItem.child && firstItem.child.length > 0
                ? this.renderSubMenu(firstItem)
                : this.renderMenu(firstItem);
            })}
        </Menu>
      </Fragment>
    );
  }
}

export default withRouter(AsideMenu);
