import React, { Component } from 'react';
import { HashRouter, Switch } from 'react-router-dom'
import Admin from './pages/Admin';

class App extends Component {

  render() {
    return (
      <HashRouter>
        <Switch>
          <Admin />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
