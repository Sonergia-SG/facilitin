import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'bulma/css/bulma.css';
import './css/index.css';

import Routeur from './components/Routeur';
import * as serviceWorker from './serviceWorker';

import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <Routeur />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
