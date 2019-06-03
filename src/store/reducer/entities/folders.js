import merge from 'lodash.merge';

import { LIST_LOADED, LOGOUT, FOLDER_LOADED } from '../../types';

const folders = (state = {}, action) => {
  switch (action.type) {
    case FOLDER_LOADED:
    case LIST_LOADED: {
      const { folders: f } = action.normalized.entities;
      return merge({}, state, f);
    }
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default folders;
