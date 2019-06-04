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

type loginErrors = {
  +email: string | null,
  +password: string | null,
  +form: string | null,
};

export type LoginState = {
  +email: string,
  +password: string,
  +errors: loginErrors,
  +loading: boolean,
};

type LoginReducerAction = {
  type: string,
  errors?: loginErrors,
  email?: string,
  password?: string,
};

type LoginReducer = (state: LoginState, action: LoginReducerAction) => LoginState;

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
