// @ts-ignore
import merge from 'lodash.merge';

import { CheckPoints, CheckPointsActions } from './types'
import { LOGOUT, FOLDER_LOADED } from '../../types';

const checkPoints = (state: CheckPoints = {}, action: CheckPointsActions): CheckPoints => {
  switch (action.type) {
    case FOLDER_LOADED: {
      const { checkPoints: c } = action.normalized.entities;
      return merge({}, state, c);
    }
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default checkPoints;
