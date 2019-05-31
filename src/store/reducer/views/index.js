import { combineReducers } from 'redux';

import login from './login';
import list from './list';

export default combineReducers({ login, list });
