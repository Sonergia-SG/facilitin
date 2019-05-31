import { LIST_LOADED, LOGOUT } from '../../types';

const folders = (state = {}, action) => {
  switch (action.type) {
    case LIST_LOADED:
      return {
        ...state,
        ...action.normalized.entities.folders,
      };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default folders;
