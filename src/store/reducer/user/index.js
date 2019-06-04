// @flow
import { USER_ADD_TOKEN, LOGOUT } from '../../types';

export type UserState = {
  +apiKey?: string,
};

export type UserReducerActionAddToken = {
  type: string,
  apiKey: string,
};

type UserReducerAction = UserReducerActionAddToken;

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
