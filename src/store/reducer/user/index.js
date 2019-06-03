// @flow
import { USER_ADD_TOKEN, LOGOUT } from '../../types';

export type UserState = {
  +apiKey?: string,
};

type UserReducerAction = {
  type: string,
  apiKey?: string,
};

type UserReducer = (state: UserState, action: UserReducerAction) => UserState;

const initialState: UserState = {
  apiKey: undefined,
};

const user: UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ADD_TOKEN:
      return { ...state, apiKey: action.apiKey };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default user;
