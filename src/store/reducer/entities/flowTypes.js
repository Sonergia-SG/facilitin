// @flow
export type CheckPoint = {
  id_controle: number,
  nom_controle: string,
  controle_valide: 0 | 1,
};

export type CheckPoints = {
  [number]: CheckPoint,
};

export type File = {
  id_file: number,
  type: string,
  name_file: string,
  point_controle: Array<number>,
};

export type FileFullDenormalized = {
  id_file: number,
  type: string,
  name_file: string,
  point_controle: Array<CheckPoint>,
  controle_valide: 0 | 1,
  nb_bad_controle_auto: number,
  litige: 0 | 1,
};

export type Files = {
  [string]: File,
};

export type MOA = {
  moa_est_societe: number,
  moa_civilite: string,
  moa_nom: string,
  moa_prenom: string,
  moa_fonction?: string,
  moa_rue: string,
  moa_rue2: string,
  moa_cp: number,
  moa_ville: string,
  moa_pays: string,
  moa_tel: string,
  moa_tel_2: string,
};

export type MOE = {
  moe_denomination: string,
};

export type Site = {
  adresse_travaux: string,
};

export type Folder = {
  id_dossierprime: number,
  code_operation: string,
  date_reception?: string,
  delai_instruction?: string,
  id_dp_operation?: number,
  is_avant_projet?: number,
  label_public?: string,
  moa_denomination?: string,
  moa_nom?: string,
  moa_prenom?: string,
  statut_operation?: number,
  documents?: Array<number>,
  moa?: Array<MOA>,
  moe?: Array<MOE>,
  travaux?: Array<Site>,
};

export type FolderFullDenormalized = {
  id_dossierprime: number,
  code_operation: string,
  date_reception?: string,
  delai_instruction?: string,
  id_dp_operation?: number,
  is_avant_projet?: number,
  label_public?: string,
  moa_denomination?: string,
  moa_nom?: string,
  moa_prenom?: string,
  statut_operation?: number,
  documents?: Array<File>,
  moa?: Array<MOA>,
  moe?: Array<MOE>,
  travaux?: Array<Site>,
};

export type Folders = {
  [string]: Folder,
};

export type Entities = {
  checkPoints: CheckPoints,
  files: Files,
  folders: Folders,
};

export type Normalized = {
  entities: Entities,
};
