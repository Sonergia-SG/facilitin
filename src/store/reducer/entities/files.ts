// @ts-ignore
import merge from 'lodash.merge';

import { Files, FilesActions } from './types'

import { LOGOUT, FOLDER_LOADED } from '../../types';

const files = (state: Files = {}, action: FilesActions): Files => {
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
