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
    id_dp_file: 0,
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
