import React, { Suspense } from 'react';
// @ts-ignore
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from '../Login';

import { AppState } from '../../store/index';

const AppRouter = React.lazy(() => import('./App'));

interface Props {
  logged: boolean;
}

const Root = ({ logged }: Props) => {
  if (logged) {
    return (
      <Suspense fallback={<div />}>
        <AppRouter />
      </Suspense>
    );
  }

  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Redirect to="/login" />
    </Switch>
  );
};

export default connect((s: AppState) => ({ logged: !!s.user.apiKey }))(Root);
