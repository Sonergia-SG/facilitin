// @flow

/* eslint-disable no-use-before-define */
import { type Store as ReduxStore, type Dispatch as ReduxDispatch } from 'redux';

import { type State } from './reducer';
import { type Actions } from './actions';

export type Store = ReduxStore<State, Actions, Dispatch>;

export type GetState = () => State;

export type Dispatch = ReduxDispatch<Actions> & Thunk<Actions>;

export type Thunk<A> = ((Dispatch, GetState) => Promise<void> | void) => A;
