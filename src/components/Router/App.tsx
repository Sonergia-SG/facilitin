import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Liste from '../Liste';
import Folder from '../Folder';
import Header from '../Header';

import { getUserInfos } from '../../store/actions/user'

interface Props {
  getUserInfos: any;
}

class AppRouter extends Component<Props> {
  componentDidMount() {
    this.props.getUserInfos()
  }
  render() {
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
}

export default connect(null, { getUserInfos })(AppRouter);
