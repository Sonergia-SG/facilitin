import React from 'react';
import { shallow } from 'enzyme';

import { ValidationComponent as Validation } from '../Validation';
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
    valide: -1,
    id_dp_file: 0,
  },
  pointcontrolcategories: {
    id_point_controle_categorie: 0,
    code_categorie: 'CAT',
    nom_categorie: 'NAME',
  },
};

describe('Litige button', () => {
  it('render in progress', () => {
    const wrapper = shallow(
      <Validation
        file={{ statut: 0, id_dp_file: 0 }}
        folderId={0}
        ending={() => 'Hello'}
        checkPoints={[defaultCheckPoint]}
        locked={false}
        loading={false}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('render validate', () => {
    const wrapper = shallow(
      <Validation
        file={{ statut: 0, id_dp_file: 0 }}
        folderId={0}
        ending={() => 'Hello'}
        checkPoints={[{
          ...defaultCheckPoint,
          pivot: { ...defaultCheckPoint.pivot, valide: 1 },
        }]}
        locked={false}
        loading={false}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('render locked', () => {
    const wrapper = shallow(
      <Validation
        file={{ statut: 0, id_dp_file: 0 }}
        folderId={0}
        ending={() => 'Hello'}
        checkPoints={[{
          ...defaultCheckPoint,
          pivot: { ...defaultCheckPoint.pivot, valide: 1 },
        }]}
        locked
        loading={false}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('render litige', () => {
    const wrapper = shallow(
      <Validation
        file={{ statut: 0, id_dp_file: 0 }}
        folderId={0}
        ending={() => 'Hello'}
        checkPoints={[{
          ...defaultCheckPoint,
          pivot: { ...defaultCheckPoint.pivot, valide: 0 },
        }]}
        locked={false}
        loading={false}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('render rejected', () => {
    const wrapper = shallow(
      <Validation
        file={{ statut: 0, id_dp_file: 0 }}
        folderId={0}
        ending={() => 'Hello'}
        checkPoints={[{
          ...defaultCheckPoint,
          id_penalite: 2,
          pivot: { ...defaultCheckPoint.pivot, valide: 0 },
        }]}
        locked={false}
        loading={false}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
