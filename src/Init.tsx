import React, { Component } from 'react';
import { Provider } from 'react-redux';

// import 'bulma/css/bulma.css';
import './Init.scss';
import './css/index.css';

import Router from './components/Router';

import storeCreator, { getStore } from './store';
import Alert from './components/Alert';
import Layout from './Layout';

class Init extends Component {
  state = {
    displayApp: false,
  };

  componentDidMount() {
    this.initStore();
  }

  initStore = () => {
    storeCreator();
    this.setState({ displayApp: true });
  };

  render() {
    const { displayApp } = this.state;

    if (displayApp) {
      return (
        <Provider store={getStore()}>
          <Layout>
            <Router />
          </Layout>
          <Alert />
        </Provider>
      );
    }

    return null;
  }
}

export default Init;
