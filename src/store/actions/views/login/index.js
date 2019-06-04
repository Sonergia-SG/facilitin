// @flow
import {
  LOGIN_LOADING,
  LOGIN_ERROR,
  LOGIN_LOADED,
  LOGIN_UPDATE_ERRORS,
  LOGIN_UPDATE_EMAIL,
  LOGIN_UPDATE_PASSWORD,
  LOGOUT,
} from '../../../types';

import { API_PATH, ERROR_APPEND, WRONG_ID } from '../../../../variables';
import capture from '../../../../tools/errorReporting/captureException';
import { addToken } from '../../user';

import {
  type LoginReducerLoading,
  type LoginReducerError,
  type LoginErrors,
  type LoginReducerLoaded,
  type LoginReducerUpdateErrors,
  type LoginReducerUpdateMail,
  type LoginReducerUpdatePassword,
} from '../../../reducer/views/login';
import { type State } from '../../../reducer';

type LoginLoading = () => LoginReducerLoading;

export const loginLoading: LoginLoading = () => ({
  type: LOGIN_LOADING,
});

type LoginLoaded = () => LoginReducerLoaded;

export const loginLoaded: LoginLoaded = () => ({
  type: LOGIN_LOADED,
});

type LoginError = (errors: LoginErrors) => LoginReducerError;

export const loginError: LoginError = errors => ({
  type: LOGIN_ERROR,
  errors,
});

export type LogoutAction = () => { type: typeof LOGOUT };

export const logout: LogoutAction = () => ({
  type: LOGOUT,
});

type UpdateErrors = (errors: LoginErrors) => LoginReducerUpdateErrors;

export const updateErrors: UpdateErrors = errors => ({
  type: LOGIN_UPDATE_ERRORS,
  errors,
});

type LoginUpdateEmail = (email: string) => LoginReducerUpdateMail;

export const loginUpdateEmail: LoginUpdateEmail = email => ({
  type: LOGIN_UPDATE_EMAIL,
  email,
});

type LoginUpdatePassword = (password: string) => LoginReducerUpdatePassword;

export const loginUpdatePassword: LoginUpdatePassword = password => ({
  type: LOGIN_UPDATE_PASSWORD,
  password,
});

type Dispatch = mixed => void;

type GetState = () => State;

type LoginRequest = () => (dispatch: Dispatch, getState: GetState) => Promise<void>;

export const loginRequest: LoginRequest = () => async (dispatch, getState) => {
  const { email, password } = getState().views.login;

  const validEmail = email && /^.+@.+\..{2,}$/.test(email);
  const validMdp = !!password;

  const { errors } = getState().views.login;

  dispatch(
    updateErrors({
      ...errors,
      email: validEmail ? null : 'Email ne peut pas être vide',
      password: validMdp ? null : 'Mot de passe ne peut pas être vide',
    }),
  );

  const formIsValid = validEmail && validMdp;

  if (formIsValid) {
    dispatch(loginLoading());

    try {
      const response = await fetch(`${API_PATH}login?email=${email}&password=${password}`);

      if (response.status < 200 || response.status >= 300) {
        throw new Error(ERROR_APPEND);
      }

      if (response.status >= 200 && response.status < 300) {
        const json = await response.json();

        if (json.status !== 'success') throw new Error(WRONG_ID);

        dispatch(loginLoaded());

        dispatch(addToken(json.api_key));
      }
    } catch (error) {
      const knowErrors = {
        [ERROR_APPEND]: "Une erreur s'est produite",
        [WRONG_ID]: 'Identifiants inconnus',
        default: "Une erreur s'est produite connexion impossible",
      };

      dispatch(
        loginError({
          ...errors,
          form: knowErrors[error.message] || knowErrors.default,
        }),
      );

      if (error.message !== ERROR_APPEND && error.message !== WRONG_ID) {
        capture(error);
      }
    }
  }
};

export type LoginActions =
  | LoginLoading
  | LoginLoaded
  | LoginError
  | LogoutAction
  | UpdateErrors
  | LoginUpdateEmail
  | LoginUpdatePassword
  | LoginRequest;
