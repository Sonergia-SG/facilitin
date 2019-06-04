// @flow
import { combineReducers } from 'redux';

import user from './user';
import views from './views';
import entities from './entities';

import { type Actions } from '../actions';

const reducers = { user, views, entities };

export type Reducers = typeof reducers;

/* eslint-disable no-undef */
type $ExtractFunctionReturn = <V>((...args: any) => V) => V;

export type State = $ObjMap<Reducers, $ExtractFunctionReturn>;
/* eslint-enable */

export default combineReducers<Reducers, Actions>(reducers);
