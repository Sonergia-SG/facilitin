// @ts-ignore
import merge from 'lodash.merge'

import { Comments, CommentsActions } from './types'
import { COMMENTS_LIST_LOADED } from '../../types';

const comments = (state: Comments = {}, action: CommentsActions): Comments => {
  switch (action.type) {
    case COMMENTS_LIST_LOADED:
      const { comments: c } = action.normalized.entities;
      return merge({}, state, c);
    default:
      return state
  }
}

export default comments
