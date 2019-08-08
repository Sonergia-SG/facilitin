import { FileStatus } from '../../../reducer/entities/types';
import MissingFile from '../../../../components/Folder/Accordion/MissingFile';

export interface FolderEndingErrorResponse {
  status: 'error';
  error: {
    code: number;
    message: string;
  };
  data: any;
}

export type FolderEndingResponse = | FolderEndingErrorResponse
| {
  status: 'fail';
}
| {
  status: 'success';
  statut_action: [
    {
      code_statut: 8 | 0;
      label_public: string;
      code_couleur: string;
    }
  ];
};

type MISSING_FILE = -1;
type DOCUMENT_INPROGRESS = 0;
type DOCUMENT_INCOMPLET = 5;
type DOCUMENT_REJECTED = 10;
type DOCUMENT_VALIDATED = 15;
type FileStatusString = | MISSING_FILE
| DOCUMENT_INPROGRESS
| DOCUMENT_INCOMPLET
| DOCUMENT_REJECTED
| DOCUMENT_VALIDATED;

export type FolderFileEndingResponse = | {
  status: 'fail';
}
| {
  status: 'success';
  statut: {
    code: FileStatus | FileStatusString;
    label: string;
    color: string;
  };
  file: {
    id_dp_file: number;
    id_file: number;
    filename: string;
  };
  data: Array<{
    id_point_controle: number;
    nom_point_controle: string;
    filename: string;
    id_penalite: number;
    nom_penalite: string;
  }>;
};

export type FolderUpdateCheckPointResponse = | {
  status: 'fail';
}
| {
  status: 'success';
  statut_actuel: [
    {
      code_statut: 0 | 15;
      label_public: string;
      code_couleur: string;
    }
  ];
};
