// @ts-ignore
import merge from 'lodash.merge';

import { CheckPointCategories, CheckPointCategoriesActions } from './types';
import { LOGOUT, FOLDER_LOADED } from '../../types';

const checkPointCategories = (
  state: CheckPointCategories = {},
  action: CheckPointCategoriesActions
): CheckPointCategories => {
  switch (action.type) {
    case FOLDER_LOADED: {
      const { checkPointCategories: c } = action.normalized.entities;
      return merge({}, state, c);
    }
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default checkPointCategories;
