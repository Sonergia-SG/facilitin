import { combineReducers } from 'redux';

import login from './login';
import list from './list';
import folder from './folder';
import comments from './comments';

export default combineReducers({
  login, list, folder, comments,
});
