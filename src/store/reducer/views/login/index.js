import {
  LOGIN_LOADING,
  LOGIN_LOADED,
  LOGIN_ERROR,
  LOGIN_UPDATE_ERRORS,
  LOGIN_UPDATE_EMAIL,
  LOGIN_UPDATE_PASSWORD,
  INIT,
} from '../../../types';

const initialState = {
  email: '',
  password: '',
  errors: {
    email: '',
    password: '',
    form: '',
  },
  loading: false,
};

const login = (state = initialState, action) => {
  switch (action.type) {
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
