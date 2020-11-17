import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Login from './views/login/index';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route component={Login} path="/" exact />
      </Switch>
    </HashRouter>
  );
}

export default App;
