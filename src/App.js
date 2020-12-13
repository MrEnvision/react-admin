import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Login from './views/login/index';
import Home from './views/home';
import PrivateRoute from './components/PrivateRoute';
import store from './store/index';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route component={Login} path="/" exact />
          <PrivateRoute component={Home} path="/index" />
        </Switch>
      </HashRouter>
    </Provider>
  );
}

export default App;
