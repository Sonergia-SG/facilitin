// @flow

import { combineReducers } from 'redux';

import folders from './folders';
import checkPoints from './checkPoints';
import files from './files';
import moa from './moa';
import moe from './moe';
import travaux from './travaux';

const entitiesReducer = {
  folders,
  moa,
  moe,
  travaux,
  checkPoints,
  files,
};

type EntitiesReducer = typeof entitiesReducer;

export default combineReducers<EntitiesReducer, EntitiesReducer>(entitiesReducer);
