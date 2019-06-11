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

import { ThunkAction } from '../../actions';
import captureException from '../../../tools/errorReporting/captureException';
import { API_PATH } from '../../../variables';

import { logout } from '../views/login'

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

export const getUserInfos = (): ThunkAction => async (dispatch, getState) => {
  try {
    dispatch(userInfosLoading());

    const { apiKey } = getState().user;

    const res = await fetch(`${API_PATH}getinfouser/`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${apiKey}`,
      },
    });

    if (res.status === 200) {
      type Json = {
        status: string;
        values: [UserInfos];
      };
      const json: Json = await res.json();

      const user = json.values[0];
      if (user) {
        dispatch(userInfosLoaded(user));
      } else {
        dispatch(userInfosError());
        // dispatch(logout())
      }
    } else {
      dispatch(userInfosError());
      // dispatch(logout())
    }
  } catch (error) {
    captureException(error);
    dispatch(userInfosError());
    // dispatch(logout())
  }
};
