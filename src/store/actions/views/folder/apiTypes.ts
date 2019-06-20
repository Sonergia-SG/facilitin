export type FolderEndingResponse = | {
  status: 'error';
  error: string;
}
| {
  status: 'fail';
}
| {
  status: 'success';
  statut_action: [{
    code_statut: 8 | 0;
    label_public: string;
    code_couleur: string;
  }];
};

export type FolderFileLitigeResponse = | {
  status: 'fail';
} | {
  status: 'success';
  statut_file: Array<{
    code_statut: 10 | 15;
    label_public: string;
    code_couleur: string;
  }>;
}

export type FolderUpdateCheckPointResponse = | {
  status: 'fail';
} | {
  status: 'success';
  statut_actuel: [{
    code_statut: 0 | 15;
    label_public: string;
    code_couleur: string;
  }];
}
