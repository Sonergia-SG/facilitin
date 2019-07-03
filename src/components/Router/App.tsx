import React, { CSSProperties, useEffect } from 'react';
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

  useEffect(() => {
    getInfos();
  }, []);

  return (
    <>
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
    </>
  );
};

export default connect(
  (s: AppState) => ({ userLoading: s.user.infosLoading, userInfos: s.user.user }),
  { getInfos: getUserInfos },
)(AppRouter);
