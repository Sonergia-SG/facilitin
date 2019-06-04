// @flow

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

export type LoginErrors = {
  +email: string | null,
  +password: string | null,
  +form: string | null,
};

export type LoginState = {
  +email: string,
  +password: string,
  +errors: LoginErrors,
  +loading: boolean,
};

export type LoginReducerLoading = {
  type: typeof LOGIN_LOADING,
};

export type LoginReducerLoaded = {
  type: typeof LOGIN_LOADED,
};

export type LoginReducerError = {
  type: typeof LOGIN_ERROR,
  errors?: LoginErrors,
};

export type LoginReducerUpdateMail = {
  type: typeof LOGIN_UPDATE_EMAIL,
  email?: string,
};

export type LoginReducerUpdatePassword = {
  type: typeof LOGIN_UPDATE_PASSWORD,
  password?: string,
};

export type LoginReducerUpdateErrors = {
  type: typeof LOGIN_UPDATE_ERRORS,
  errors?: LoginErrors,
};

type LoginReducerAction =
  | LoginReducerLoading
  | LoginReducerLoaded
  | LoginReducerError
  | LoginReducerUpdateMail
  | LoginReducerUpdatePassword
  | LoginReducerUpdateErrors;

type LoginReducer = (state?: LoginState, action: LoginReducerAction) => LoginState;

const initialState: LoginState = {
  email: '',
  password: '',
  errors: {
    email: null,
    password: null,
    form: null,
  },
  loading: false,
};

const login: LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
    case INIT:
      return initialState;
    case LOGIN_LOADING:
      return {
        ...state,
        loading: true,
        errors: {
          ...state.errors,
          formulaire: null,
        },
      };
    case LOGIN_LOADED:
      return {
        ...state,
        password: '',
        errors: initialState.errors,
        loading: false,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        errors: action.errors,
        loading: false,
      };
    case LOGIN_UPDATE_EMAIL:
      return {
        ...state,
        email: action.email,
      };
    case LOGIN_UPDATE_PASSWORD:
      return {
        ...state,
        password: action.password,
      };
    case LOGIN_UPDATE_ERRORS:
      return {
        ...state,
        errors: action.errors,
      };
    default:
      return state;
  }
};

export default login;
