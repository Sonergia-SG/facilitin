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

import { addToken } from '../../user';

export const loginLoading = () => ({
  type: LOGIN_LOADING,
});

export const loginLoaded = () => ({
  type: LOGIN_LOADED,
});

export const loginError = errors => ({
  type: LOGIN_ERROR,
  errors,
});

export const logout = () => ({
  type: LOGOUT,
});

export const updateErrors = errors => ({
  type: LOGIN_UPDATE_ERRORS,
  errors,
});

export const loginUpdateEmail = email => ({
  type: LOGIN_UPDATE_EMAIL,
  email,
});

export const loginUpdatePassword = password => ({
  type: LOGIN_UPDATE_PASSWORD,
  password,
});

export const loginRequest = () => async (dispatch, getState) => {
  const { email, password } = getState().views.login;

  const validEmail = email && /^.+@.+\..{2,}$/.test(email);
  const validMdp = !!password;

  const { errors } = getState();

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
      console.warn(error);
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
    }
  }
};
