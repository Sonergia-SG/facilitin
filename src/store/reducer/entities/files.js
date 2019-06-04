// @flow
import merge from 'lodash.merge';

import { LOGOUT, FOLDER_LOADED } from '../../types';
import { type Normalized, type Files } from './flowTypes';

type FilesAction = {
  type: typeof FOLDER_LOADED,
  normalized: Normalized,
};

type FilesReducer = (state: Files, action: FilesAction) => Files;

const files: FilesReducer = (state = {}, action) => {
  switch (action.type) {
    case FOLDER_LOADED: {
      const { files: f } = action.normalized.entities;
      return merge({}, state, f);
    }
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default files;
