import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Connection from '../Connection';
import Liste from '../Liste';
import Dossierprime from '../Dossierprime';

const Root = ({ logged }) => {
  if (logged) {
    return (
      <Switch>
        <Route path="/liste" component={Liste} />
        <Route path="/dossierprime" component={Dossierprime} />
        <Redirect to="/liste" />
      </Switch>
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
