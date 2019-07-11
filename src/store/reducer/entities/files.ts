// @ts-ignore
import merge from 'lodash.merge';
import idx from 'idx';

import { Files, FilesActions } from './types';

import {
  LOGOUT,
  FOLDER_LOADED,
  FOLDER_UPDATE_CHECK_POINT_LOADED,
  FOLDER_FILE_ENDING_LOADED,
} from '../../types';

const files = (state: Files = {}, action: FilesActions): Files => {
  switch (action.type) {
    case FOLDER_LOADED: {
      const { files: f } = action.normalized.entities;
      return merge({}, state, f);
    }
    case FOLDER_FILE_ENDING_LOADED:
    case FOLDER_UPDATE_CHECK_POINT_LOADED: {
      const statut = action.statusCode;
      if (!idx(state, _ => _[action.idDpFile]) || statut === null) return state;

      return {
        ...state,
        [action.idDpFile]: {
          ...state[action.idDpFile],
          statut,
        },
      };
    }
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default files;
