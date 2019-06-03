import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Connection from '../Connection';

const AppRouter = React.lazy(() => import('./App'));

const Root = ({ logged }) => {
  if (logged) {
    return (
      <Suspense fallback={<div />}>
        <AppRouter />
      </Suspense>
    );
  }

  return (
    <Switch>
      <Route exact path="/login" component={Connection} />
      <Redirect to="/login" />
    </Switch>
  );
};

Root.propTypes = {
  logged: PropTypes.bool.isRequired,
};

export default connect(s => ({ logged: !!s.user.apiKey }))(Root);
