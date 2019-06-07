import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Liste from '../Liste';
import Folder from '../Folder';
import Header from '../Header';

const AppRouter = () => (
  <div>
    <Header />
    <Switch>
      <Route path="/list" component={Liste} />
      <Route path="/folder/:folderId" component={Folder} />
      <Redirect to="/list" />
    </Switch>
  </div>
);

export default AppRouter;
