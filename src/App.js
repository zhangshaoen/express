import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom'
import MirrorManage from './pages/mirrorMange/mirrorManage';
import MirrorProve from "./components/mirrorProve/MirrorProve.js"

class App extends Component {

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/mirrorManage" component={MirrorManage}/>
          <Route path="/mirrorProve" component={MirrorProve}/>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
