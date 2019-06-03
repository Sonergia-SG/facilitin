// @flow
import { combineReducers } from 'redux';

import user from './user';
import views from './views';
import entities from './entities';

const reducer = { user, views, entities };

export type Reducer = typeof reducer;

export default combineReducers<Reducer, Reducer>(reducer);
