import React from 'react';
import { shallow } from 'enzyme';

import Input from '../Input';
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

describe('SecondaryData Input', () => {
  it('render rigth Simple case', () => {
    const wrapper = shallow(
      <Input
        key="azer"
        label="test :"
        valueKey="moa_nom"
        value="Sonergia"
        type="text"
        rules={undefined}
        idDpOperation={1}
        disabled={false}
        dossierprime={defaultDossierPrime}
        pending={undefined}
        pendingKey="moa"
        update={() => {}}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('render rigth Simple case - pending value', () => {
    const wrapper = shallow(
      <Input
        key="azer"
        label="test :"
        valueKey="moa_nom"
        value="Sonergia"
        type="text"
        rules={undefined}
        idDpOperation={1}
        disabled={false}
        dossierprime={defaultDossierPrime}
        pending={{ moa: { moa_nom: 'So' } }}
        pendingKey="moa"
        update={() => {}}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('render rigth Simple case - disabled', () => {
    const wrapper = shallow(
      <Input
        key="azer"
        label="test :"
        valueKey="moa_nom"
        value="Sonergia"
        type="text"
        rules={undefined}
        idDpOperation={1}
        disabled
        dossierprime={defaultDossierPrime}
        pending={undefined}
        pendingKey="moa"
        update={() => {}}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('render rigth with valid phone', () => {
    const wrapper = shallow(
      <Input
        key="azer"
        label="tel :"
        valueKey="moa_tel"
        value="06.06.06.06.06"
        type="text"
        rules={{ format: 'phone' }}
        idDpOperation={1}
        disabled={false}
        dossierprime={defaultDossierPrime}
        pending={undefined}
        pendingKey="moa"
        update={() => {}}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('render rigth with invalid phone', () => {
    const wrapper = shallow(
      <Input
        key="azer"
        label="tel :"
        valueKey="moa_tel"
        value="06.06.06.06"
        type="text"
        rules={{ format: 'phone' }}
        idDpOperation={1}
        disabled={false}
        dossierprime={defaultDossierPrime}
        pending={undefined}
        pendingKey="moa"
        update={() => {}}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('render rigth with invalid bic', () => {
    const wrapper = shallow(
      <Input
        key="azer"
        label="tel :"
        valueKey="moa_tel"
        value="06.06.06.06"
        type="text"
        rules={{ format: 'bic' }}
        idDpOperation={1}
        disabled={false}
        dossierprime={defaultDossierPrime}
        pending={undefined}
        pendingKey="moa"
        update={() => {}}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('render rigth with invalid iban', () => {
    const wrapper = shallow(
      <Input
        key="azer"
        label="tel :"
        valueKey="moa_tel"
        value="06.06.06.06"
        type="text"
        rules={{ format: 'iban' }}
        idDpOperation={1}
        disabled={false}
        dossierprime={defaultDossierPrime}
        pending={undefined}
        pendingKey="moa"
        update={() => {}}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('render rigth with invalid siret', () => {
    const wrapper = shallow(
      <Input
        key="azer"
        label="tel :"
        valueKey="moa_tel"
        value="78953453400018"
        type="text"
        rules={{ format: 'siret' }}
        idDpOperation={1}
        disabled={false}
        dossierprime={defaultDossierPrime}
        pending={undefined}
        pendingKey="moa"
        update={() => {}}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('render rigth with valid siret', () => {
    const wrapper = shallow(
      <Input
        key="azer"
        label="tel :"
        valueKey="moa_tel"
        value="78953453400019"
        type="text"
        rules={{ format: 'siret' }}
        idDpOperation={1}
        disabled={false}
        dossierprime={defaultDossierPrime}
        pending={undefined}
        pendingKey="moa"
        update={() => {}}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
