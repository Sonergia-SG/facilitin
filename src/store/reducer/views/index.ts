import { combineReducers } from 'redux';

import login from './login';
import list from './list';
import folder from './folder';

export default combineReducers({ login, list, folder });
