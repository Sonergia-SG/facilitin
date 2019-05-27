import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from './NotFound';
import Connection from './Connection';
import Liste from './Liste';
import Dossierprime from './Dossierprime';


const Root = () => (
  <Switch>
    <Route exact path="/" component={Connection} />
    <Route path="/liste" component={Liste} />
    <Route path="/dossierprime" component={Dossierprime} />
    <Route component={NotFound} />
  </Switch>
);


const Router = () => (
  <BrowserRouter>
    <Root />
  </BrowserRouter>
);

export default Router;
