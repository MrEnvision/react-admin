// react + ant 依赖
import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
// 组件
import PrivateRoute from '../../components/PrivateRoute'; // 自定义路由组件（可进行过滤等操作）
import Components from '../../router/components'; // 自动化组件

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="content">
        <Switch>
          {Components.map((item, index) => {
            return (
              <PrivateRoute
                component={item.component}
                path={item.path}
                key={index}
              />
            );
          })}
        </Switch>
      </div>
    );
  }
}

export default Content;
