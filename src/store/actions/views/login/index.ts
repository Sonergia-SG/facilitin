
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
  LoginLoginLoadingAction,
  LoginLoginLoadedAction,
  LoginLoginErrorAction,
  Errors,
  LoginLogoutAction,
  LoginLoginUpdateErrosAction,
  LoginLoginUpdateEmailAction,
  LoginLoginUpdatePasswordAction,
} from '../../../reducer/views/login/types';
import { ThunkAction } from '../..';

export const loginLoading = (): LoginLoginLoadingAction => ({
  type: LOGIN_LOADING,
});

export const loginLoaded = (): LoginLoginLoadedAction => ({
  type: LOGIN_LOADED,
});

export const loginError = (errors: Errors): LoginLoginErrorAction => ({
  type: LOGIN_ERROR,
  errors,
});

export const logout = (): LoginLogoutAction => ({
  type: LOGOUT,
});

export const updateErrors = (errors: Errors): LoginLoginUpdateErrosAction => ({
  type: LOGIN_UPDATE_ERRORS,
  errors,
});

export const loginUpdateEmail = (email: string): LoginLoginUpdateEmailAction => ({
  type: LOGIN_UPDATE_EMAIL,
  email,
});

export const loginUpdatePassword = (password: string): LoginLoginUpdatePasswordAction => ({
  type: LOGIN_UPDATE_PASSWORD,
  password,
});

export const loginRequest = (): ThunkAction => async (
  dispatch,
  getState,
) => {
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
      interface KnowErrors { [index: string]: string }
      const knowErrors: KnowErrors = {
        [ERROR_APPEND]: "Une erreur s'est produite",
        [WRONG_ID]: 'Identifiants inconnus',
        default: "Une erreur s'est produite connexion impossible",
      };

      dispatch(
        loginError({
          ...errors,
          formulaire: knowErrors[error.message] || knowErrors.default,
        }),
      );

      if (error.message !== ERROR_APPEND && error.message !== WRONG_ID) {
        capture(error);
      }
    }
  }
};
