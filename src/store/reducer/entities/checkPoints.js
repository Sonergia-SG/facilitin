import { LOGOUT, FOLDER_LOADED } from '../../types';

const checkPoints = (state = {}, action) => {
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
