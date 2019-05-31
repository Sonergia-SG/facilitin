import { combineReducers } from 'redux';

import folders from './folders';
import checkPoints from './checkPoints';
import files from './files';
import moa from './moa';
import moe from './moe';
import travaux from './travaux';

export default combineReducers({
  folders,
  moa,
  moe,
  travaux,
  checkPoints,
  files,
});
