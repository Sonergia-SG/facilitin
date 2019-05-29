import React from 'react';
import ReactDOM from 'react-dom';

import './tools/errorReporting';

import 'bulma/css/bulma.css';
import './css/index.css';

import * as serviceWorker from './serviceWorker';
import Init from './Init';


ReactDOM.render(
  <Init />,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
