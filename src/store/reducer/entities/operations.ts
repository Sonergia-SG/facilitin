// @ts-ignore
import merge from 'lodash.merge';

import { Operations, OperationsActions } from './types';
import {
  LOGOUT,
  FOLDER_LOADED,
  LIST_LOADED,
  FOLDER_UPDATE_SITE_LOADED,
  FOLDER_UPDATE_MOA_LOADED,
} from '../../types';

const operations = (state: Operations = {}, action: OperationsActions): Operations => {
  switch (action.type) {
    case LIST_LOADED:
    case FOLDER_LOADED: {
      const { operations: o } = action.normalized.entities;
      return merge({}, state, o);
    }
    case FOLDER_UPDATE_MOA_LOADED:
    case FOLDER_UPDATE_SITE_LOADED: {
      const oldOp = state[action.idDpOperation];
      return {
        ...state,
        [action.idDpOperation]: {
          ...oldOp,
          forms: {
            ...oldOp.forms,
            site: action.values,
          },
        },
      };
    }
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default operations;
