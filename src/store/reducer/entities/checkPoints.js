import merge from 'lodash.merge';

import { LOGOUT, FOLDER_LOADED } from '../../types';

const checkPoints = (state = {}, action) => {
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
