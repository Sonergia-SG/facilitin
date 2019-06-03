import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import List from '../List';
import Folder from '../Folder';
import Header from '../Header';

const AppRouter = () => (
  <div style={{ height: '100%' }}>
    <Header />
    <Switch>
      <Route path="/list" component={List} />
      <Route path="/folder/:folderId" component={Folder} />
      <Redirect to="/list" />
    </Switch>
  </div>
);

export default connect(s => ({ logged: !!s.user.apiKey }))(AppRouter);
