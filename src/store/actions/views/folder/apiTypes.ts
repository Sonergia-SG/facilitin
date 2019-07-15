import { FileStatus } from '../../../reducer/entities/types';

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

export type FolderFileEndingResponse = | {
  status: 'fail';
}
| {
  status: 'success';
  statut: {
    code: FileStatus;
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
