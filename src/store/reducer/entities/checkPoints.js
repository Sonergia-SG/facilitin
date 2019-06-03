import merge from 'lodash.merge';

import {
  LOGOUT,
  FOLDER_LOADED,
  FOLDER_UPDATE_CHECK_POINT_LOADING,
  FOLDER_UPDATE_CHECK_POINT_LOADED,
  FOLDER_UPDATE_CHECK_POINT_ERROR,
} from '../../types';

const checkPoints = (state = {}, action) => {
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
          controle_valide: action.preValue,
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
