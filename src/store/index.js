// @flow

/* eslint-disable no-underscore-dangle */

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import persistState from 'redux-localstorage';

import reducer, { type State } from './reducer';

import { type Actions } from './actions';

import { type Dispatch, type Store } from './flowTypes';

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: process.env.NODE_ENV === 'development',
  })
  : compose;
const middlewares = applyMiddleware(thunkMiddleware);

const storeVersion = 1;
const storeKey = `themis_redux_v${storeVersion}`;

let store;

const storeCreator = (): Store => {
  const initialState = localStorage.getItem(storeKey);

  const enhancers = composeEnhancers(middlewares, persistState(null, { key: storeKey }));

  store = createStore<State, Actions, Dispatch>(
    reducer,
    initialState ? JSON.parse(initialState) : undefined,
    enhancers,
  );

  return store;
};

export const getStore = () => store;

export default storeCreator;
