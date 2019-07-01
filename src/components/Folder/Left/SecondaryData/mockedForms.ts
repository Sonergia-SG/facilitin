import { Forms } from './types';

const formsData: Forms = {
  moa: [
    {
      label: 'Nom MOA',
      value: 'ESCHALIER',
      key: 'moa_nom',
      type: 'text',
    },
    {
      label: 'Prénom MOA',
      value: 'Igor',
      key: 'moa_prenom',
      type: 'text',
    },
    {
      label: 'Fonction MOA',
      value: 'Dev',
      key: 'moa_fonction',
      type: 'text',
    },
  ],
  moe: [
    {
      label: 'Denomination',
      value: 'Mr',
      key: 'moe_denomination',
      type: 'text',
    },
    {
      label: 'Siret',
      value: '12342134SDQF1324',
      key: 'moe_siret',
      type: 'text',
    },
    {
      label: 'Télèphone',
      value: '063214',
      key: 'moe_tel',
      type: 'text',
    },
  ],
  site: [
    {
      label: 'Nom du site',
      value: 'Cosmetique',
      key: 'adresse_travaux_nomsite',
      type: 'text',
    },
    {
      label: 'Début des travaux',
      value: '2019-06-30',
      key: 'date_debut_travaux',
      type: 'date',
    },
    {
      label: 'Fin des travaux',
      value: '2019-06-30',
      key: 'date_fin_travaux',
      type: 'date',
    },
  ],
};

export default formsData;
