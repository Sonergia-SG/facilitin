import React from 'react';
// @ts-ignore
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Connection from '../Connection';
import Liste from '../Liste';
import Folder from '../Folder';
import Header from '../Header';

import { AppState } from '../../store/index';

interface Props {
  logged: boolean;
}

const Root = ({ logged }: Props) => {
  if (logged) {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/list" component={Liste} />
          <Route path="/folder/:folderId" component={Folder} />
          <Redirect to="/list" />
        </Switch>
      </div>
    );
  }

  return (
    <Switch>
      <Route exact path="/login" component={Connection} />
      <Redirect to="/login" />
    </Switch>
  );
};

export default connect((s: AppState) => ({ logged: !!s.user.apiKey }))(Root);
