import React, { Component, Fragment } from 'react';
import { Layout } from 'antd';
import Header from './Header';
import Aside from './Aside';
import Content from './Content';
import './../../styles/views/home.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  toggleMenu = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Fragment>
        <Layout className="layout">
          <Layout.Sider
            className="layout__aside"
            collapsed={this.state.collapsed}
          >
            <Aside collapsed={this.state.collapsed} />
          </Layout.Sider>
          <Layout className="layout__wrap">
            <Layout.Header className="layout__header">
              <Header
                collapsed={this.state.collapsed}
                toggleMenu={this.toggleMenu}
              />
            </Layout.Header>
            <Layout.Content className="layout__main">
              <Content />
            </Layout.Content>
          </Layout>
        </Layout>
      </Fragment>
    );
  }
}

export default Home;
