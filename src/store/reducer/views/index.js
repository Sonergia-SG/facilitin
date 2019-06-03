// @flow
import { combineReducers } from 'redux';

import login from './login';
import list from './list';
import folder from './folder';

const viewReducer = { login, list, folder };

export type ViewReducer = typeof viewReducer;

export default combineReducers<ViewReducer, ViewReducer>(viewReducer);
