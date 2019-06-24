// @ts-ignore
import merge from 'lodash.merge';

import { Operations, OperationsActions } from './types';
import {
  LOGOUT, FOLDER_LOADED, LIST_LOADED, FOLDER_ENDING_LOADED,
} from '../../types';

const operations = (state: Operations = {}, action: OperationsActions): Operations => {
  switch (action.type) {
    case LIST_LOADED:
    case FOLDER_LOADED: {
      const { operations: o } = action.normalized.entities;
      return merge({}, state, o);
    }
    case FOLDER_ENDING_LOADED: {
      if (!state[action.idDpOperation]) return state;

      return {
        ...state,
        [action.idDpOperation]: {
          ...state[action.idDpOperation],
          statut: {
            ...state[action.idDpOperation].statut,
            ...action.status,
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
