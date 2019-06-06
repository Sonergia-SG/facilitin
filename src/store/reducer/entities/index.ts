import { combineReducers } from 'redux';

import folders from './folders';
import checkPoints from './checkPoints';
import files from './files';

export default combineReducers({
  folders,
  checkPoints,
  files,
});
