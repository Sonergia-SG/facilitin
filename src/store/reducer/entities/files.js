import { LOGOUT, FOLDER_LOADED } from '../../types';

const files = (state = {}, action) => {
  switch (action.type) {
    case FOLDER_LOADED:
      return {
        ...state,
        ...action.normalized.entities.files,
      };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default files;
