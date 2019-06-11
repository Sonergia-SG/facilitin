import { UserState, UserActionTypes } from './types';
import {
  USER_ADD_TOKEN,
  LOGOUT,
  USER_INFOS_LOADING,
  USER_INFOS_LOADED,
  USER_INFOS_ERROR,
} from '../../types';

const initialState: UserState = {
  apiKey: null,
  infosLoading: false,
  user: null,
};

const user = (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case USER_ADD_TOKEN:
      return { ...state, apiKey: action.apiKey };
    case USER_INFOS_LOADING:
      return { ...state, infosLoading: true };
    case USER_INFOS_LOADED:
      return { ...state, infosLoading: false, user: action.user };
    case USER_INFOS_ERROR:
      return { ...state, infosLoading: false };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default user;
