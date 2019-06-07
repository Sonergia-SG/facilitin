import { LOGOUT, FOLDER_LOADED, LIST_LOADED } from '../../types';

export enum BooleanNumber {
  ON = 1,
  OFF = 0,
}

export interface SimpleFile {
  id_dp_file: number;
  id_file: number;
  id_dp_operation: number;
  id_dossierprime: number;
  is_devis: BooleanNumber;
  is_aat: BooleanNumber;
  is_facture: BooleanNumber;
  is_lettre_engagement: BooleanNumber;
  is_justif_preca: BooleanNumber;
  is_autres: BooleanNumber;
  is_aft: BooleanNumber;
  is_contrat_distrib: BooleanNumber;
  is_conv_tepcv: BooleanNumber;
  is_conv_regroupement: BooleanNumber;
  is_liste_depenses: BooleanNumber;
  is_attestation_tepcv: BooleanNumber;
  is_attestation_collectivite: BooleanNumber;
  is_etat_recapitulatif: BooleanNumber;
  is_ah: BooleanNumber;
  is_horodatage: BooleanNumber;
  is_subrogation: BooleanNumber;
  statut: number;
  litige: BooleanNumber;
}

export interface File extends SimpleFile {}

export interface FileFull extends SimpleFile {}

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
  moa_denomination: string;
}

export interface Operation {
  id_dp_operation: number;
  id_dossierprime: number;
  id_operation: number;
  code_operation: string;
  statut: {
    id_statut: number;
    label_prive: string;
  };
  dossierprime: Folder;
  dossierprimefile: [File];
  point_controles: [CheckPoint];
}

export interface SimpleFolder {
  id_dp_operation: number;
  id_dossierprime: number;
  code_operation: string;
  moa?: Array<MOA>;
  moe?: Array<{}>;
  travaux?: Array<{}>;
  moa_est_societe: 0;
  moa_civilite: string;
  moa_nom: string;
  moa_prenom: string;
  moa_fonction: string | null;
  moa_rue: string;
  moa_rue2: string;
  moa_cp: string;
  moa_ville: string;
  moa_pays: string;
  moa_tel: string;
  moa_tel_2: string;
  moa_mobile: string;
  moa_email: string;
  moa_bic: string;
  moa_iban: string;
  moa_siret: string;
  moa_no_siret: BooleanNumber;
  moa_denomination: string;
  moa_fax: string;
  moa_commentaire: string;
  moa_individu_email: string;
  moa_contact: string;
  moa_contact_mobile: string;
  moa_individu_fonction: string | null;
  moa_beneficiaire_role: string | null;
  moa_categorie_menage: number;
  moa_nombre_menage: number;
  moa_nombre_personne: number;
  moa_remp_preca: number;
  moa_is_syndic: BooleanNumber;
  moa_raison_sociale_siege: string;
  moa_siren_siege: string;
  moa_adresse_siege: string;
  moa_cp_siege: string;
  moa_ville_siege: string;
  moe_denomination: string;
  moe_siret: string;
  moe_tel: string;
  moe_fax: string;
  moe_rue: string;
  moe_cp: string;
  moe_ville: string;
  moe_role: number;
  moe_commentaire: string;
  moe_individu_email: string;
  moe_contact: string;
  moe_contact_prenom: string;
  moe_contact_mobile: string;
  moe_contact_fonction: string;
  moe_bic: string;
  moe_iban: string;
  adresse_travaux_rue: string;
  adresse_travaux_nomsite: string;
  adresse_travaux_rue2: string;
  adresse_travaux_cp: string;
  adresse_travaux_ville: string;
  date_debut_travaux: string | null;
  date_fin_travaux: string | null;
  /* code_operation: "BAR-TH-106"
  date_reception: "2018-06-11"
  delai_instruction?: "331 jours de retard"
  id_dossierprime: 19925
  id_dp_operation: 60839
  is_avant_projet: 0
  label_public: "Dossier Incomplet"
  moa_denomination: ""
  moa_nom: "JAUD"
  moa_prenom: "Jean-Marie"
  statut_operation: 13 */
}

export interface Folder extends SimpleFolder {
  documents?: Array<number>;
}

export interface FolderFull extends SimpleFolder {
  documents?: Array<FileFull>;
}

export interface Folders {
  [index: number]: File;
}

export interface CheckPointCategory {
  id_point_controle_categorie: number;
  code_categorie: string;
  nom_categorie: string | null;
}

export interface CheckPoint {
  id_point_controle: number;
  id_categorie: number;
  nom: string;
  id_penalite: BooleanNumber;
  automatique: BooleanNumber;
  pivot: {
    id_dp_operation: number;
    id_point_controle: number;
    valide: BooleanNumber;
  };
  pointcontrolcategories: CheckPointCategory;
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
