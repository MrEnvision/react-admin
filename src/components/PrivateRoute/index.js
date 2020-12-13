// react + ant 依赖
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// 其他
import { getToken } from '../../utils/cookie';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        getToken() ? <Component {...routeProps} /> : <Redirect to="/" />
      }
    />
  );
}

export default PrivateRoute;
