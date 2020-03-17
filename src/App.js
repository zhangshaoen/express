import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom'
import Home from './components/home.js';

class App extends Component {

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/home" component={Home}/>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
