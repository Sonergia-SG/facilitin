import { combineReducers } from 'redux';

import counter from './counter';
import user from './user';
import views from './views';

export default combineReducers({ counter, user, views });
