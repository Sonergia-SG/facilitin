import React, { Component } from 'react';
import NotFound from  './NotFound';
import Connection from './Connection';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Root = () => (
    <Switch>
      <Route exact path='/' component={Connection} />
      <Route path='/card/:name' component={NotFound} />
      <Route component={NotFound} />
    </Switch>
);

class Routeur extends Component {
  render() {
      return(
        <Router>
          <Root />
        </Router>
      )
  }
}

export default Routeur;
