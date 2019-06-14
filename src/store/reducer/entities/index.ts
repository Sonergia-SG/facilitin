import { combineReducers } from 'redux';

import folders from './folders';
import checkPoints from './checkPoints';
import files from './files';
import checkPointCategories from './checkPointCategories';
import operations from './operations';
import comments from './comments';
import users from './users';

export default combineReducers({
  folders,
  checkPoints,
  checkPointCategories,
  operations,
  files,
  comments,
  users
});
