import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Login from './views/login/index';
import Home from './views/Home';
import PrivateRoute from './components/privateRoute';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route component={Login} path="/" exact />
        <PrivateRoute component={Home} path="/index" />
      </Switch>
    </HashRouter>
  );
}

export default App;
