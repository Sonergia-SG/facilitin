import { CheckPoints, CheckPointsActions } from './types'
import { LOGOUT, FOLDER_LOADED } from '../../types';

const checkPoints = (state: CheckPoints = {}, action: CheckPointsActions): CheckPoints => {
  switch (action.type) {
    case FOLDER_LOADED:
      return {
        ...state,
        ...action.normalized.entities.checkPoints,
      };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default checkPoints;
