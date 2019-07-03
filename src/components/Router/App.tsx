import React, { Component, CSSProperties, ReactNode } from 'react';
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
  getInfos: any;
}

class LoadOnMount extends Component<{ getInfos: any; children: ReactNode }> {
  componentDidMount() {
    this.props.getInfos();
  }

  render() {
    return this.props.children;
  }
}

const AppRouter = ({ userLoading, userInfos, getInfos }: Props) => {
  const displayApp = !userLoading && !!userInfos;

  const transitions = useTransition<boolean, CSSProperties>(
    displayApp,
    item => `${item}`,
    {
      from: { position: 'absolute', opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
    },
  );

  return (
    <LoadOnMount getInfos={getInfos}>
      {transitions.map(({ item, props, key }) => (item ? (
        <animated.div key={key} style={props} className="Router-App-Container">
          <Header />
          <div className="Router-background">
            <div className="Router-content-centered">
              <Switch>
                <Route path="/actions/:folderId" component={Folder} />
                <Route path="/actions" component={Actions} />
                <Redirect to="/actions" />
              </Switch>
            </div>
          </div>
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
  { getInfos: getUserInfos },
)(AppRouter);
