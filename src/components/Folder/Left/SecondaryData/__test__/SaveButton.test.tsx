import React from 'react';
import { shallow } from 'enzyme';

import SaveButton from '../SaveButton';
import { BooleanNumber } from '../../../../../store/reducer/entities/types';

const defaultDossierPrime = {
  id_dp_operation: 123,
  id_dossierprime: 123,
  code_operation: '03ER',
  moa_est_societe: 0,
  moa_is_syndic: 0 as BooleanNumber,
  moa_no_siret: 0 as BooleanNumber,
  moa_categorie_menage: 1,
  moa_nombre_menage: 1,
  moa_nombre_personne: 2,
  moa_remp_preca: 3,
  moe_role: 3,
  moa_civilite: '',
  moa_nom: '',
  moa_prenom: '',
  moa_rue: '',
  moa_rue2: '',
  moa_cp: '',
  moa_ville: '',
  moa_pays: '',
  moa_tel: '',
  moa_tel_2: '',
  moa_mobile: '',
  moa_email: '',
  moa_bic: '',
  moa_iban: '',
  moa_siret: '',
  moa_denomination: '',
  moa_fax: '',
  moa_commentaire: '',
  moa_individu_email: '',
  moa_contact: '',
  moa_contact_mobile: '',
  moa_raison_sociale_siege: '',
  moa_siren_siege: '',
  moa_adresse_siege: '',
  moa_cp_siege: '',
  moa_ville_siege: '',
  moa_fonction: null,
  moa_individu_fonction: null,
  moa_beneficiaire_role: null,
  moe_denomination: '',
  moe_siret: '',
  moe_tel: '',
  moe_fax: '',
  moe_rue: '',
  moe_cp: '',
  moe_ville: '',
  moe_commentaire: '',
  moe_individu_email: '',
  moe_contact: '',
  moe_contact_prenom: '',
  moe_contact_mobile: '',
  moe_contact_fonction: '',
  moe_bic: '',
  moe_iban: '',
  adresse_travaux_rue: '',
  adresse_travaux_nomsite: '',
  adresse_travaux_rue2: '',
  adresse_travaux_cp: '',
  adresse_travaux_ville: '',
  date_debut_travaux: null,
  date_fin_travaux: null,
};

describe('SaveButton', () => {
  it('disbled without value update', () => {
    const wrapper = shallow(
      <SaveButton
        idDpOperation={123}
        idDossierPrime={123}
        dossierprime={defaultDossierPrime}
        edit={false}
        edited={false}
        loading={false}
        pending={undefined}
        pendingKey="moa"
        post={() => {}}
        def={[]}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('in danger mode with invalid field', () => {
    const wrapper = shallow(
      <SaveButton
        idDpOperation={123}
        idDossierPrime={123}
        dossierprime={defaultDossierPrime}
        edit={false}
        edited={false}
        loading={false}
        pending={undefined}
        pendingKey="moa"
        post={() => {}}
        def={[
          {
            key: 'moa_nom',
            label: 'Nom',
            type: 'text',
            value: 'Sonergia',
          },
          {
            key: 'moa_tel',
            label: 'Tel',
            type: 'text',
            rules: {
              format: 'phone',
            },
            value: '06.06.06.06',
          },
        ]}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('in danger mode with invalid field and disabled', () => {
    const wrapper = shallow(
      <SaveButton
        idDpOperation={123}
        idDossierPrime={123}
        dossierprime={defaultDossierPrime}
        edit
        edited
        loading={false}
        pending={{ moa: { moa_tel: '06.06' } }}
        pendingKey="moa"
        post={() => {}}
        def={[
          {
            key: 'moa_nom',
            label: 'Nom',
            type: 'text',
            value: 'Sonergia',
          },
          {
            key: 'moa_tel',
            label: 'Tel',
            type: 'text',
            rules: {
              format: 'phone',
            },
            value: '06.06.06.06',
          },
        ]}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('in success mode with all valid field and enabled', () => {
    const wrapper = shallow(
      <SaveButton
        idDpOperation={123}
        idDossierPrime={123}
        dossierprime={defaultDossierPrime}
        edit
        edited
        loading={false}
        pending={{ moa: { moa_tel: '06.06.06.06.06' } }}
        pendingKey="moa"
        post={() => {}}
        def={[
          {
            key: 'moa_nom',
            label: 'Nom',
            type: 'text',
            value: 'Sonergia',
          },
          {
            key: 'moa_tel',
            label: 'Tel',
            type: 'text',
            rules: {
              format: 'phone',
            },
            value: '06.06.06.06',
          },
        ]}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('disabled if not edited', () => {
    const wrapper = shallow(
      <SaveButton
        idDpOperation={123}
        idDossierPrime={123}
        dossierprime={defaultDossierPrime}
        edit={false}
        edited={false}
        loading={false}
        pending={{ moa: { moa_tel: '06.06.06.06.06' } }}
        pendingKey="moa"
        post={() => {}}
        def={[
          {
            key: 'moa_nom',
            label: 'Nom',
            type: 'text',
            value: 'Sonergia',
          },
          {
            key: 'moa_tel',
            label: 'Tel',
            type: 'text',
            rules: {
              format: 'phone',
            },
            value: '06.06.06.06',
          },
        ]}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('loading', () => {
    const wrapper = shallow(
      <SaveButton
        idDpOperation={123}
        idDossierPrime={123}
        dossierprime={defaultDossierPrime}
        edit
        edited
        loading
        pending={{ moa: { moa_tel: '06.06.06.06.06' } }}
        pendingKey="moa"
        post={() => {}}
        def={[
          {
            key: 'moa_nom',
            label: 'Nom',
            type: 'text',
            value: 'Sonergia',
          },
          {
            key: 'moa_tel',
            label: 'Tel',
            type: 'text',
            rules: {
              format: 'phone',
            },
            value: '06.06.06.06',
          },
        ]}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
