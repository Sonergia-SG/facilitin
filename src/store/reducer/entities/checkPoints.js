// @flow
import merge from 'lodash.merge';

import {
  LOGOUT,
  FOLDER_LOADED,
  FOLDER_UPDATE_CHECK_POINT_LOADING,
  FOLDER_UPDATE_CHECK_POINT_LOADED,
  FOLDER_UPDATE_CHECK_POINT_ERROR,
} from '../../types';
import { type Normalized, type CheckPoints } from './flowTypes';

type CheckPointsActionLoaded = {
  type: typeof FOLDER_LOADED,
  normalized: Normalized,
  checkPointId: string,
  prevValue: number,
};

type CheckPointsActionUpdateLoading = {
  type: typeof FOLDER_UPDATE_CHECK_POINT_LOADING,
  checkPointId: string,
  prevValue: number,
};

type CheckPointsActionUpdateError = {
  type: typeof FOLDER_UPDATE_CHECK_POINT_ERROR,
  checkPointId: string,
  prevValue: number,
};

type CheckPointsAction =
  | CheckPointsActionLoaded
  | CheckPointsActionUpdateLoading
  | CheckPointsActionUpdateError;

type CheckPointsReducer = (state: CheckPoints, action: CheckPointsAction) => CheckPoints;

const checkPoints: CheckPointsReducer = (state = {}, action) => {
  switch (action.type) {
    case FOLDER_LOADED: {
      const { checkPoints: c } = action.normalized.entities;
      return merge({}, state, c);
    }
    case FOLDER_UPDATE_CHECK_POINT_LOADING:
      return {
        ...state,
        [action.checkPointId]: {
          ...state[action.checkPointId],
          controle_valide: action.prevValue === 1 ? 0 : 1,
        },
      };
    case FOLDER_UPDATE_CHECK_POINT_ERROR:
      return {
        ...state,
        [action.checkPointId]: {
          ...state[action.checkPointId],
          controle_valide: action.prevValue,
        },
      };
    case LOGOUT:
      return {};
    case FOLDER_UPDATE_CHECK_POINT_LOADED:
    default:
      return state;
  }
};

export default checkPoints;
