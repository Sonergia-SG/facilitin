import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import persistState from 'redux-localstorage';

import reducer from './reducer';

// eslint-disable-next-line
const composeEnhancers =
// eslint-disable-next-line
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: process.env.NODE_ENV === 'development',
  }) || compose;
const middlewares = applyMiddleware(thunkMiddleware);

const storeVersion = 1;
const storeKey = `themis_redux_v${storeVersion}`;

let store;

const storeCreator = () => {
  const initialState = localStorage.getItem(storeKey);

  const enhancers = composeEnhancers(middlewares, persistState(null, { key: storeKey }));

  store = initialState
    ? createStore(reducer, JSON.parse(initialState), enhancers)
    : createStore(reducer, enhancers);

  return store;
};

export const getStore = () => store;

export default storeCreator;
