import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../../components/privateRoute';
import Components from '../../router/components';

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
