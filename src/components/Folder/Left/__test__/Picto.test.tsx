import React from 'react';
import { shallow } from 'enzyme';

import Picto from '../Picto';

describe('Picto', () => {
  it('render warning for litige', () => {
    const wrapper = shallow(<Picto total={2} valid={1} litige={1} rejected={0} unTraited={0} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('render error for rejected', () => {
    const wrapper = shallow(<Picto total={2} valid={1} litige={0} rejected={1} unTraited={0} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('render untraited', () => {
    const wrapper = shallow(<Picto total={2} valid={1} litige={0} rejected={0} unTraited={1} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('render success if total === valid', () => {
    const wrapper = shallow(<Picto total={2} valid={2} litige={0} rejected={0} unTraited={0} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('make error more priority', () => {
    const wrapper = shallow(<Picto total={4} valid={1} litige={1} rejected={1} unTraited={1} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('make warning more priority', () => {
    const wrapper = shallow(<Picto total={4} valid={2} litige={1} rejected={0} unTraited={1} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('make untraited more priority', () => {
    const wrapper = shallow(<Picto total={4} valid={3} litige={0} rejected={0} unTraited={1} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('make checked less priority', () => {
    const wrapper = shallow(<Picto total={4} valid={4} litige={0} rejected={0} unTraited={0} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('display untraited for strange results', () => {
    const wrapper = shallow(<Picto total={4} valid={5} litige={0} rejected={0} unTraited={0} />);

    expect(wrapper).toMatchSnapshot();
  });
});
