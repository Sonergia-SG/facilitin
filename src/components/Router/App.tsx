import React, { Component, CSSProperties } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTransition, animated } from 'react-spring';

import Actions from '../Actions';
import Folder from '../Folder';
import Header from '../Header';
import Loading from '../Loading';

import { getUserInfos } from '../../store/actions/user';
import { UserInfos } from '../../store/reducer/user/types';
import { AppState } from '../../store';

import './App.css';

interface Props {
  userLoading: boolean;
  userInfos: UserInfos | null;
  getUserInfos: any;
}

class LoadOnMount extends Component<{ getUserInfos: any }> {
  componentDidMount() {
    this.props.getUserInfos();
  }

  render() {
    return this.props.children;
  }
}

const AppRouter = ({ userLoading, userInfos, getUserInfos }: Props) => {
  const displayApp = !userLoading && !!userInfos;

  const transitions = useTransition<boolean, CSSProperties>(
    displayApp, 
    (item) => `${item}`,
    {
      from: { position: 'absolute', opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
    }
  );

  return (
    <LoadOnMount getUserInfos={getUserInfos}>
      {transitions.map(({ item, props, key }) => (item ? (
        <animated.div key={key} style={props} className="Router-App-Container">
          <Header />
          <Switch>
            <Route path="/actions/:folderId" component={Folder} />
            <Route path="/actions" component={Actions} />
            <Redirect to="/actions" />
          </Switch>
        </animated.div>
      ) : (
        <animated.div key={key} style={props} className="Router-App-Loading-Container">
          <Loading show />
        </animated.div>
      )))}
    </LoadOnMount>
  );
};

export default connect(
  (s: AppState) => ({ userLoading: s.user.infosLoading, userInfos: s.user.user }),
  { getUserInfos },
)(AppRouter);
