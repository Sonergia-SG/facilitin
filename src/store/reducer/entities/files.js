import merge from 'lodash.merge';

import { LOGOUT, FOLDER_LOADED } from '../../types';

const files = (state = {}, action) => {
  switch (action.type) {
    case FOLDER_LOADED: {
      const { files: f } = action.normalized.entities;
      return merge({}, state, f);
    }
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default files;
