import { LOGOUT, FOLDER_LOADED, LIST_LOADED } from '../../types';

export enum FolderCheckPointValue {
  ON = 1,
  OFF = 0,
}

export interface File {
  id_file: number;
}

export interface Files {
  [index: number]: File;
}

export interface Folder {}

export interface Folders {
  [index: number]: File;
}

export interface CheckPoint {
  controle_valide: FolderCheckPointValue;
}

export interface CheckPoints {
  [index: number]: CheckPoint;
}

export interface Entities {
  files: Files;
  folders: Folders;
  checkPoints: CheckPoints;
}

export interface Normalized {
  entities: Entities;
}

export interface FilesFolderLoadedAction {
  type: typeof FOLDER_LOADED;
  normalized: Normalized;
}

export interface FilesLogoutAction {
  type: typeof LOGOUT;
}

export type FilesActions = FilesFolderLoadedAction | FilesLogoutAction;

export interface FoldersFolderLoadedAction {
  type: typeof FOLDER_LOADED;
  normalized: Normalized;
}

export interface FoldersListLoadedAction {
  type: typeof LIST_LOADED;
  normalized: Normalized;
}

export interface FoldersLogoutAction {
  type: typeof LOGOUT;
}

export type FoldersActions = | FoldersFolderLoadedAction
  | FoldersLogoutAction
  | FoldersListLoadedAction;

export interface CheckPointsFolderLoadedAction {
  type: typeof FOLDER_LOADED;
  normalized: Normalized;
}

export interface CheckPointsLogoutAction {
  type: typeof LOGOUT;
}

export type CheckPointsActions = CheckPointsFolderLoadedAction | CheckPointsLogoutAction;
