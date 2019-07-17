import React from 'react';
import { shallow } from 'enzyme';

import GeneralInfos, { Props } from '../GeneralInfos';
import { CheckPoint } from '../../../../store/reducer/entities/types';

const defaultCheckPoint: CheckPoint = {
  id_point_controle: 0,
  id_categorie: 0,
  nom: 'Checkpoint test',
  id_penalite: 1,
  automatique: 0,
  is_controle_file: 0,
  pivot: {
    id_dp_operation: 0,
    id_point_controle: 0,
    valide: 1,
    id_dp_file: 1234,
  },
  pointcontrolcategories: {
    id_point_controle_categorie: 0,
    code_categorie: 'CAT',
    nom_categorie: 'NAME',
  },
};

const props: Props = {
  title: 'Dossier N°',
  data: {
    code_operation: 'BAR-TH-113',
    statut: undefined,
    dossierprimefile: [{
      id_dp_file: 1234,
      id_file: 3245,
      id_dp_operation: 764,
      id_dossierprime: 8432,
      filename: 'test.pdf',
      mimetype: 'application/pdf',
      is_devis: 0,
      is_aat: 0,
      is_facture: 0,
      is_lettre_engagement: 0,
      is_justif_preca: 0,
      is_autres: 0,
      is_aft: 0,
      is_contrat_distrib: 0,
      is_conv_tepcv: 0,
      is_conv_regroupement: 0,
      is_liste_depenses: 0,
      is_attestation_tepcv: 0,
      is_attestation_collectivite: 0,
      is_etat_recapitulatif: 0,
      is_ah: 0,
      is_horodatage: 0,
      is_subrogation: 0,
      statut: 0,
      litige: 0,
    }],
  },
  loading: false,
  checkPoints: [
    defaultCheckPoint,
    defaultCheckPoint,
    defaultCheckPoint,
    defaultCheckPoint,
  ],
};

describe('GeneralInfos', () => {
  it('render correctly with all checkpoints valid', () => {
    const wrapper = shallow(<GeneralInfos {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('render correctly with untraited checkpoints', () => {
    const localProps: Props = {
      ...props,
      checkPoints: [
        ...props.checkPoints,
        {
          ...defaultCheckPoint,
          pivot: {
            ...defaultCheckPoint.pivot,
            valide: -1,
          },
        },
      ],
    };
    const wrapper = shallow(<GeneralInfos {...localProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('render correctly with litige checkpoints', () => {
    const localProps: Props = {
      ...props,
      checkPoints: [
        ...props.checkPoints,
        {
          ...defaultCheckPoint,
          id_penalite: 1,
          pivot: {
            ...defaultCheckPoint.pivot,
            valide: 0,
          },
        },
      ],
    };
    const wrapper = shallow(<GeneralInfos {...localProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('render correctly with rejected checkpoints', () => {
    const localProps: Props = {
      ...props,
      checkPoints: [
        ...props.checkPoints,
        {
          ...defaultCheckPoint,
          id_penalite: 2,
          pivot: {
            ...defaultCheckPoint.pivot,
            valide: 0,
          },
        },
      ],
    };
    const wrapper = shallow(<GeneralInfos {...localProps} />);

    expect(wrapper).toMatchSnapshot();
  });
});
