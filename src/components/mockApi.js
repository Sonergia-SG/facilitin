/* eslint-disable import/prefer-default-export */

export const datahand = {
  id_dossierprime: 13555,
  code_operation: 'BAR-TH-113',
  documents: [
    {
      type: 'AAT',
      name_file: 'lkdsjf.pdf',
      id_file: 1,
      link_document: 'http://www.sonergia.fr/id_image',
      litige: 0,
      nb_bad_controle_auto: 0,
      point_controle: [
        { id_controle: 1, nom_controle: 'point de controle 1', controle_valide: 0 },
        { id_controle: 4, nom_controle: 'point de controle 2', controle_valide: 0 },
        { id_controle: 8, nom_controle: 'point de controle 3', controle_valide: 0 },
      ],
    },
    {
      type: 'Devis',
      name_file: 'ppppjjj.pdf',
      id_file: 2,
      link_document: 'http://www.sonergia.fr/id_image',
      litige: 0,
      nb_bad_controle_auto: 1,
      point_controle: [
        { id_controle: 2, nom_controle: 'point de controle 10', controle_valide: 1 },
        { id_controle: 5, nom_controle: 'point de controle 7', controle_valide: 1 },
        { id_controle: 9, nom_controle: 'point de controle 4', controle_valide: 0 },
      ],
    },
    {
      type: 'Facture',
      name_file: 'azerty.doc',
      id_file: 3,
      link_document: 'http://www.sonergia.fr/id_image',
      litige: 0,
      nb_bad_controle_auto: 0,
      point_controle: [
        { id_controle: 3, nom_controle: 'point de controle 11', controle_valide: 1 },
        { id_controle: 6, nom_controle: 'point de controle 8', controle_valide: 1 },
        { id_controle: 10, nom_controle: 'point de controle 5', controle_valide: 0 },
      ],
    },
    {
      type: 'Doc technique',
      name_file: 'qsdfgss.pdf',
      id_file: 4,
      link_document: 'http://www.sonergia.fr/id_image',
      litige: 1,
      nb_bad_controle_auto: 0,
      point_controle: [
        { id_controle: 4, nom_controle: 'point de controle 12', controle_valide: 1 },
        { id_controle: 7, nom_controle: 'point de controle 9', controle_valide: 1 },
        { id_controle: 11, nom_controle: 'point de controle 6', controle_valide: 0 },
      ],
    },
  ],
  moa: [
    {
      moa_est_societe: 0,
      moa_civilite: 'Mr',
      moa_nom: 'POLONA',
      moa_prenom: 'Jacques',
      moa_fonction: null,
      moa_rue: '31 chemin de la clue',
      moa_rue2: '',
      moa_cp: 13013,
      moa_ville: 'Marseille',
      moa_pays: 'France',
      moa_tel: '04 04 04 91 91',
      moa_tel_2: '',
    },
  ],
  moe: [{ moe_denomination: 'coca cola' }],
  travaux: [{ adresse_travaux: '18 chemin de la route bleu' }],
};
