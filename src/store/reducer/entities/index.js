import { combineReducers } from 'redux';

import folders from './folders';
import documents from './documents';
import moa from './moa';
import moe from './moe';
import travaux from './travaux';

export default combineReducers({
  folders,
  moa,
  moe,
  travaux,
  documents,
});
