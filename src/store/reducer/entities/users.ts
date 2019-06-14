// @ts-ignore
import merge from 'lodash.merge';

import { Users, UsersActions } from './types'
import { COMMENTS_LIST_LOADED } from '../../types';


const users = (state: Users = {}, action: UsersActions): Users => {
  switch (action.type) {
    case COMMENTS_LIST_LOADED:
      const { users: u } = action.normalized.entities;
      return merge({}, state, u);
    default:
      return state
  }
}

export default users;