import { USER_ADD_TOKEN, LOGOUT } from '../../types';

export interface UserState {
  apiKey: string | null;
}

export interface UserAddTokenAction {
  type: typeof USER_ADD_TOKEN;
  apiKey: string | null;
}

export interface UserLogoutAction {
  type: typeof LOGOUT;
}

export type UserActionTypes = UserAddTokenAction | UserLogoutAction;
