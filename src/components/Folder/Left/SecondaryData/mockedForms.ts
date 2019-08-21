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
      label: 'BIC',
      value: '124545253425',
      key: 'moa_bic',
      type: 'text',
      rules: {
        format: 'bic',
      },
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
              value: 'Masculin',
            },
            {
              key: 'female',
              value: 'Féminin',
            },
            {
              key: 'other',
              value: 'Autre',
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
      label: 'Numéro fiscale',
      value: '0123453456789',
      key: 'moa_email',
      type: 'text',
      rules: {
        format: 'num_fiscal',
      },
    },
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
      value: '06.32.14.12.12',
      key: 'moe_tel',
      type: 'text',
      rules: {
        format: 'phone',
      },
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
      rules: {
        format: 'bic',
      },
    },
    {
      label: 'Iban',
      value: '',
      key: 'moe_iban',
      type: 'text',
      rules: {
        format: 'iban',
      },
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
