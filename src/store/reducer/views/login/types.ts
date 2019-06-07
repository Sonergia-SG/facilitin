import {
  LOGIN_LOADING,
  LOGIN_LOADED,
  LOGIN_ERROR,
  LOGIN_UPDATE_ERRORS,
  LOGIN_UPDATE_EMAIL,
  LOGIN_UPDATE_PASSWORD,
  LOGOUT,
  INIT,
} from '../../../types';

export interface Errors {
  email: string | null,
  password: string | null,
  formulaire: string | null,
}

export interface LoginState {
  email: string;
  password: string;
  errors: Errors;
  loading: boolean;
}

export interface LoginLogoutAction {
  type: typeof LOGOUT;
}

export interface LoginInitAction {
  type: typeof INIT;
}

export interface LoginLoginLoadingAction {
  type: typeof LOGIN_LOADING;
}

export interface LoginLoginLoadedAction {
  type: typeof LOGIN_LOADED;
}

export interface LoginLoginErrorAction {
  type: typeof LOGIN_ERROR;
  errors: Errors;
}

export interface LoginLoginUpdateEmailAction {
  type: typeof LOGIN_UPDATE_EMAIL;
  email: string;
}

export interface LoginLoginUpdatePasswordAction {
  type: typeof LOGIN_UPDATE_PASSWORD;
  password: string;
}

export interface LoginLoginUpdateErrosAction {
  type: typeof LOGIN_UPDATE_ERRORS;
  errors: Errors;
}

export type LoginAction =
  | LoginLoginLoadingAction
  | LoginLoginLoadedAction
  | LoginLoginErrorAction
  | LoginLoginUpdateEmailAction
  | LoginLoginUpdatePasswordAction
  | LoginLoginUpdateErrosAction
  | LoginLogoutAction
  | LoginInitAction;
