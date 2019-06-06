import { LOGOUT, FOLDER_LOADED, LIST_LOADED } from '../../types';

export enum FolderCheckPointValue {
  ON = 1,
  OFF = 0,
}

export enum FileLitige {
  ON = 1,
  OFF = 0,
}

export interface SimpleFile {
  id_file: number;
  type: string;
  name_file: string;
  nb_bad_controle_auto: number;
  id_dp_operation: number;
}

export interface File extends SimpleFile {
  litige: FileLitige;
  point_controle: Array<number>
}

export interface FileFull extends SimpleFile {
  litige: FileLitige;
  point_controle: Array<CheckPoint>
}

export interface Files {
  [index: number]: File;
}

export interface MOA {
  moa_prenom: string;
  moa_nom: string;
  moa_fonction: string;
  moa_rue: string;
  moa_rue2: string;
  moa_cp: string;
  moa_ville: string;
  moa_denomination: string,
}

export interface SimpleFolder {
  id_dossierprime: number;
  code_operation: string;
  moa: Array<MOA>;
  moe: Array<{}>;
  travaux: Array<{}>;
}

export interface Folder extends SimpleFolder {
  documents: Array<number>;
}

export interface FolderFull extends SimpleFolder {
  documents: Array<FileFull>;
}

export interface Folders {
  [index: number]: File;
}

export interface CheckPoint {
  id_controle: number;
  nom_controle: string;
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
