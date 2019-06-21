// @ts-ignore
import merge from 'lodash.merge';

import { Folders, FoldersActions } from './types';
import {
  LIST_LOADED, LOGOUT, FOLDER_LOADED, FOLDER_UPDATE_MOA_LOADED, FOLDER_UPDATE_MOE_LOADED,
} from '../../types';

const folders = (state: Folders = {}, action: FoldersActions): Folders => {
  switch (action.type) {
    case FOLDER_LOADED:
    case LIST_LOADED: {
      const { folders: f } = action.normalized.entities;
      return merge({}, state, f);
    }
    case FOLDER_UPDATE_MOA_LOADED:
      return {
        ...state,
        [action.id_dossierprime]: {
          ...state[action.id_dossierprime],
          ...action.values,
        },
      };
    case FOLDER_UPDATE_MOE_LOADED:
      return {
        ...state,
        [action.id_dossierprime]: {
          ...state[action.id_dossierprime],
          ...action.values,
        },
      };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default folders;
