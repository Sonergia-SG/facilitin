// @ts-ignore
import merge from 'lodash.merge';

import { Operations, OperationsActions } from './types';
import { LOGOUT, FOLDER_LOADED } from '../../types';

const operations = (
  state: Operations = {},
  action: OperationsActions
): Operations => {
  switch (action.type) {
    case FOLDER_LOADED: {
      const { operations: o } = action.normalized.entities;
      return merge({}, state, o);
    }
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default operations;
