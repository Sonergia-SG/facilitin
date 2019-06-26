// @ts-ignore
import merge from 'lodash.merge';
import idx from 'idx';

import { CheckPoints, CheckPointsActions } from './types';
import {
  LOGOUT,
  FOLDER_LOADED,
  LIST_LOADED,
  FOLDER_UPDATE_CHECK_POINT_LOADING,
  FOLDER_UPDATE_CHECK_POINT_LOADED,
  FOLDER_UPDATE_CHECK_POINT_ERROR,
} from '../../types';

const checkPoints = (state: CheckPoints = {}, action: CheckPointsActions): CheckPoints => {
  switch (action.type) {
    case LIST_LOADED:
    case FOLDER_LOADED: {
      const { checkPoints: c } = action.normalized.entities;
      return merge({}, state, c);
    }
    case FOLDER_UPDATE_CHECK_POINT_LOADING: {
      if (!idx(state, _ => _[action.checkPointId].pivot)) return state;

      return {
        ...state,
        [action.checkPointId]: {
          ...state[action.checkPointId],
          pivot: {
            ...state[action.checkPointId].pivot,
            valide: action.newValue,
          },
        },
      };
    }
    case FOLDER_UPDATE_CHECK_POINT_ERROR: {
      if (!idx(state, _ => _[action.checkPointId].pivot)) return state;

      return {
        ...state,
        [action.checkPointId]: {
          ...state[action.checkPointId],
          pivot: {
            ...state[action.checkPointId].pivot,
            valide: action.preValue,
          },
        },
      };
    }
    case LOGOUT:
      return {};
    case FOLDER_UPDATE_CHECK_POINT_LOADED:
    default:
      return state;
  }
};

export default checkPoints;
