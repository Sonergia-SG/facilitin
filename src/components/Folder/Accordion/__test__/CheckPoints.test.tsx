import React from 'react';
import { shallow } from 'enzyme';

import { CheckPointsComponent as CheckPoints } from '../CheckPoints';
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
    valide: 0,
    id_dp_file: 0,
  },
  pointcontrolcategories: {
    id_point_controle_categorie: 0,
    code_categorie: 'CAT',
    nom_categorie: 'NAME',
  },
};

describe('CheckPoints', () => {
  it('render correctly with default checkpoint', () => {
    const wrapper = shallow(
      <CheckPoints
        checkPoints={[defaultCheckPoint]}
        fileId={0}
        folderId={0}
        updateCheckPoint={() => 'Hello'}
        locked={false}
        pending={{}}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
  it('render correctly when locked', () => {
    const wrapper = shallow(
      <CheckPoints
        checkPoints={[defaultCheckPoint]}
        fileId={0}
        folderId={0}
        updateCheckPoint={() => 'Hello'}
        locked
        pending={{}}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
  it('render correctly with checkpoint valid', () => {
    const wrapper = shallow(
      <CheckPoints
        checkPoints={[{
          ...defaultCheckPoint,
          pivot: {
            ...defaultCheckPoint.pivot,
            valide: 1,
          },
        }]}
        fileId={0}
        folderId={0}
        updateCheckPoint={() => 'Hello'}
        locked={false}
        pending={{}}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
  it('render correctly with checkpoint no traited', () => {
    const wrapper = shallow(
      <CheckPoints
        checkPoints={[{
          ...defaultCheckPoint,
          pivot: {
            ...defaultCheckPoint.pivot,
            valide: -1,
          },
        }]}
        fileId={0}
        folderId={0}
        updateCheckPoint={() => 'Hello'}
        locked={false}
        pending={{}}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('render correctly with checkpoint sending', () => {
    const wrapper = shallow(
      <CheckPoints
        checkPoints={[{
          ...defaultCheckPoint,
          pivot: {
            ...defaultCheckPoint.pivot,
            valide: 1,
          },
        }]}
        fileId={0}
        folderId={0}
        updateCheckPoint={() => 'Hello'}
        locked={false}
        pending={{
          checkPoint: {
            0: {
              status: 'SENDING',
            },
          },
        }}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('render correctly during folder loading', () => {
    const wrapper = shallow(
      <CheckPoints
        checkPoints={[{
          ...defaultCheckPoint,
          pivot: {
            ...defaultCheckPoint.pivot,
            valide: 1,
          },
        }]}
        fileId={0}
        folderId={0}
        updateCheckPoint={() => 'Hello'}
        locked={false}
        pending={{
          loading: true,
        }}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('can\'t update checkpoint if it\'s an automatic checkpoint', () => {
    const wrapper = shallow(
      <CheckPoints
        checkPoints={[{
          ...defaultCheckPoint,
          automatique: 1,
        }]}
        fileId={0}
        folderId={0}
        updateCheckPoint={() => 'Hello'}
        locked={false}
        pending={{}}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
