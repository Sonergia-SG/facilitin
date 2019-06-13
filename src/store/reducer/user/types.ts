import {
  USER_ADD_TOKEN,
  LOGOUT,
  USER_INFOS_LOADING,
  USER_INFOS_LOADED,
  USER_INFOS_ERROR,
  INIT,
} from '../../types';

export type UserFonction = 'instructeur_initial' | 'instructeur_suivi' | '';

export interface UserInfos {
  nom: string;
  prenom: string;
  identifiant: string;
  id_groupe: number;
  fonction: UserFonction;
}

export interface UserState {
  apiKey: string | null;
  infosLoading: boolean;
  user: UserInfos | null;
}

export interface UserInit {
  type: typeof INIT;
}

export interface UserAddTokenAction {
  type: typeof USER_ADD_TOKEN;
  apiKey: string | null;
}

export interface UserInfosLoading {
  type: typeof USER_INFOS_LOADING;
}

export interface UserInfosLoaded {
  type: typeof USER_INFOS_LOADED;
  user: UserInfos;
}

export interface UserInfosError {
  type: typeof USER_INFOS_ERROR;
}

export interface UserLogoutAction {
  type: typeof LOGOUT;
}

export type UserActionTypes = | UserInit
  | UserAddTokenAction
  | UserLogoutAction
  | UserInfosLoading
  | UserInfosLoaded
  | UserInfosError;
