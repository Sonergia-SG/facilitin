import React from 'react';
import { shallow } from 'enzyme';

import { CheckPointsComponent as CheckPoints } from '../CheckPoints';
import { CheckPoint } from '../../../../store/reducer/entities/types';

import Radio from '../../../../Common/UIKIT/Form/Radio';

const checkPoints: Array<CheckPoint> = [
  {
    id_point_controle: 1,
    id_categorie: 3,
    is_controle_file: 0,
    nom: 'test de controle',
    id_penalite: 1,
    automatique: 0,
    pivot: {
      id_dp_operation: 90184,
      id_point_controle: 1,
      valide: 0,
      id_dp_file: 38580,
    },
    pointcontrolcategories: {
      id_point_controle_categorie: 3,
      code_categorie: 'is_facture',
      nom_categorie: 'Facture',
    },
  },
];

describe('CheckPoints disabled rules', () => {
  it('disabled if lockedByStatus', () => {
    const wrapper = shallow(
      <CheckPoints
        checkPoints={checkPoints}
        fileId={38580}
        folderId={8654}
        updateCheckPoint={() => {}}
        lockedByStatus
        pending={undefined}
        locked={false}
      />,
    );

    const radios = wrapper.find(Radio);

    expect(radios).toHaveLength(2);
    expect(radios.get(0).props.disabled).toBe(true);
    expect(radios.get(1).props.disabled).toBe(true);
  });

  it('disabled if loading', () => {
    const wrapper = shallow(
      <CheckPoints
        checkPoints={checkPoints}
        fileId={38580}
        folderId={8654}
        updateCheckPoint={() => {}}
        lockedByStatus={false}
        pending={{ loading: true }}
        locked={false}
      />,
    );

    const radios = wrapper.find(Radio);

    expect(radios).toHaveLength(2);
    expect(radios.get(0).props.disabled).toBe(true);
    expect(radios.get(1).props.disabled).toBe(true);
  });

  it('disabled if checkpoint sending', () => {
    const wrapper = shallow(
      <CheckPoints
        checkPoints={checkPoints}
        fileId={38580}
        folderId={8654}
        updateCheckPoint={() => {}}
        lockedByStatus={false}
        pending={{ checkPoint: { 1: { status: 'SENDING' } } }}
        locked={false}
      />,
    );

    const radios = wrapper.find(Radio);

    expect(radios).toHaveLength(2);
    expect(radios.get(0).props.disabled).toBe(true);
    expect(radios.get(1).props.disabled).toBe(true);
  });

  it('disabled if automatique checkpoint', () => {
    const wrapper = shallow(
      <CheckPoints
        checkPoints={[{ ...checkPoints[0], automatique: 1 }]}
        fileId={38580}
        folderId={8654}
        updateCheckPoint={() => {}}
        lockedByStatus={false}
        pending={undefined}
        locked={false}
      />,
    );

    const radios = wrapper.find(Radio);

    expect(radios).toHaveLength(2);
    expect(radios.get(0).props.disabled).toBe(true);
    expect(radios.get(1).props.disabled).toBe(true);
  });

  it('disabled if action locked', () => {
    const wrapper = shallow(
      <CheckPoints
        checkPoints={checkPoints}
        fileId={38580}
        folderId={8654}
        updateCheckPoint={() => {}}
        lockedByStatus={false}
        pending={undefined}
        locked
      />,
    );

    const radios = wrapper.find(Radio);

    expect(radios).toHaveLength(2);
    expect(radios.get(0).props.disabled).toBe(true);
    expect(radios.get(1).props.disabled).toBe(true);
  });

  it('not disabled if loading false', () => {
    const wrapper = shallow(
      <CheckPoints
        checkPoints={checkPoints}
        fileId={38580}
        folderId={8654}
        updateCheckPoint={() => {}}
        lockedByStatus={false}
        pending={{ loading: false }}
        locked={false}
      />,
    );

    const radios = wrapper.find(Radio);

    expect(radios).toHaveLength(2);
    expect(radios.get(0).props.disabled).toBe(false);
    expect(radios.get(1).props.disabled).toBe(false);
  });

  it('not disabled if none of this', () => {
    const wrapper = shallow(
      <CheckPoints
        checkPoints={checkPoints}
        fileId={38580}
        folderId={8654}
        updateCheckPoint={() => {}}
        lockedByStatus={false}
        pending={undefined}
        locked={false}
      />,
    );

    const radios = wrapper.find(Radio);

    expect(radios).toHaveLength(2);
    expect(radios.get(0).props.disabled).toBe(false);
    expect(radios.get(1).props.disabled).toBe(false);
  });
});
