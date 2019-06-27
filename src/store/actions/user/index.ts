import * as Sentry from '@sentry/browser';

import {
  UserAddTokenAction,
  UserInfosLoading,
  UserInfosLoaded,
  UserInfosError,
  UserInfos,
} from '../../reducer/user/types';
import {
  USER_ADD_TOKEN,
  USER_INFOS_LOADING,
  USER_INFOS_LOADED,
  USER_INFOS_ERROR,
} from '../../types';

import { ThunkAction } from '..';
import captureException from '../../../tools/errorReporting/captureException';
import { API_PATH } from '../../../variables';

import { logout } from '../views/login';

import rest from '../../../tools/rest';

// eslint-disable-next-line import/prefer-default-export
export const addToken = (apiKey: string): UserAddTokenAction => ({
  type: USER_ADD_TOKEN,
  apiKey,
});

export const userInfosLoading = (): UserInfosLoading => ({
  type: USER_INFOS_LOADING,
});

export const userInfosLoaded = (user: UserInfos): UserInfosLoaded => ({
  type: USER_INFOS_LOADED,
  user,
});

export const userInfosError = (): UserInfosError => ({
  type: USER_INFOS_ERROR,
});

export const getUserInfos = (): ThunkAction => async (dispatch) => {
  const dispatchError = () => {
    dispatch(userInfosError());
    dispatch(logout());
    Sentry.configureScope((scope) => {
      scope.setUser(null);
    });
  };

  try {
    dispatch(userInfosLoading());

    const res = await rest(`${API_PATH}getinfouser`);

    switch (res.status) {
      case 200: {
        interface Json {
          status: string;
          values: UserInfos;
        }
        const json: Json = await res.json();

        const user = json.values;
        if (user) {
          dispatch(userInfosLoaded(user));

          Sentry.configureScope((scope) => {
            scope.setUser({ id: `${user.id_user}` });
          });
        } else {
          dispatchError();
        }
        break;
      }
      case 401:
      default: {
        dispatchError();
        break;
      }
    }
  } catch (error) {
    captureException(error);
    dispatchError();
  }
};
