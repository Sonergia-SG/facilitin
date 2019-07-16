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
    {
      label: 'Nom MOA',
      type: 'section',
      fields: [
        {
          label: 'Nom MOA',
          value: 'ESCHALIER',
          key: 'moa_nom',
          type: 'text',
        },
        {
          label: 'Genre',
          value: null,
          values: [
            {
              key: 'male',
              label: 'Masculin',
            },
            {
              key: 'female',
              label: 'Féminin',
            },
            {
              key: 'other',
              label: 'Autre',
            },
          ],
          key: 'moa_civilite',
          type: 'list',
        },
      ],
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
    {
      label: 'Commentaire',
      value: '',
      key: 'moe_commentaire',
      type: 'text',
    },
    {
      label: 'BIC',
      value: '',
      key: 'moe_bic',
      type: 'text',
    },
    {
      label: 'Iban',
      value: '',
      key: 'moe_iban',
      type: 'text',
    },
    {
      label: 'Addresse',
      type: 'section',
      fields: [
        {
          label: 'Rue',
          value: '1100 RUE GUSTAVE EIFFEL',
          key: 'moe_rue',
          type: 'text',
        },
        {
          label: 'Code Postal',
          value: '73200',
          key: 'moe_cp',
          type: 'text',
        },
        {
          label: 'ville',
          value: 'GILLY SUR ISERE',
          key: 'moe_ville',
          type: 'text',
        },
      ],
    },
    {
      label: 'Contact',
      type: 'section',
      fields: [
        {
          label: 'Contact',
          value: 'Sylvain PUITS',
          key: 'moe_contact',
          type: 'text',
        },
        {
          label: 'Contact prenom',
          value: '',
          key: 'moe_contact_prenom',
          type: 'text',
        },
        {
          label: 'Contact mobile',
          value: '',
          key: 'moe_contact_mobile',
          type: 'text',
        },
        {
          label: 'Contact fonction',
          value: '',
          key: 'moe_contact_fonction',
          type: 'text',
        },
      ],
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
