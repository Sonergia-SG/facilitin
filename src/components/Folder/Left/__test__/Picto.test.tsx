/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { shallow } from 'enzyme';

import Picto from '../Picto';

describe('Picto', () => {
  it('render error for litige', () => {
    const wrapper = shallow(<Picto total={2} valid={1} litige={1} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('render warning if total !== valid', () => {
    const wrapper = shallow(<Picto total={2} valid={1} litige={0} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('render success if total === valid', () => {
    const wrapper = shallow(<Picto total={2} valid={2} litige={0} />);

    expect(wrapper).toMatchSnapshot();
  });
});
