/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { shallow } from 'enzyme';

import Litige from '../Litige';

describe('Litige button', () => {
  it('render Litige button enabled by default', () => {
    const wrapper = shallow(
      <Litige
        file={{ statut: 0, id_dp_file: 0 }}
        folderId={0}
        inLitige={() => 'Hello'}
        loading={false}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('render Litige button disabled for status 10 (rejected)', () => {
    const wrapper = shallow(
      <Litige
        file={{ statut: 10, id_dp_file: 0 }}
        folderId={0}
        inLitige={() => 'Hello'}
        loading={false}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('render Litige button disabled for status 15 (accespted)', () => {
    const wrapper = shallow(
      <Litige
        file={{ statut: 15, id_dp_file: 0 }}
        folderId={0}
        inLitige={() => 'Hello'}
        loading={false}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('render Litige button loading', () => {
    const wrapper = shallow(
      <Litige
        file={{ statut: 0, id_dp_file: 0 }}
        folderId={0}
        inLitige={() => 'Hello'}
        loading
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
