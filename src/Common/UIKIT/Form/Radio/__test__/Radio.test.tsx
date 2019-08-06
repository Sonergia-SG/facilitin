import React from 'react';
import { shallow } from 'enzyme';

import Radio from '../index';

describe('Radio', () => {
  it('render checked correctly', () => {
    const wrapper = shallow(
      <Radio checked id="test" name="test" value="test" onChange={() => {}} />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('render not checked correctly', () => {
    const wrapper = shallow(
      <Radio checked={false} id="test" name="test" value="test" onChange={() => {}} />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('render checked and disabled correctly', () => {
    const wrapper = shallow(
      <Radio checked disabled id="test" name="test" value="test" onChange={() => {}} />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('render not checked and disabled correctly', () => {
    const wrapper = shallow(
      <Radio checked={false} disabled id="test" name="test" value="test" onChange={() => {}} />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('render checked and hover correctly', () => {
    const wrapper = shallow(
      <Radio checked id="test" name="test" value="test" onChange={() => {}} />,
    );

    wrapper.simulate('mouseEnter');

    expect(wrapper).toMatchSnapshot();
  });

  it('render not checked and hover correctly', () => {
    const wrapper = shallow(
      <Radio checked={false} id="test" name="test" value="test" onChange={() => {}} />,
    );

    wrapper.simulate('mouseEnter');

    expect(wrapper).toMatchSnapshot();
  });

  it('render checked, disabled and hover correctly', () => {
    const wrapper = shallow(
      <Radio checked disabled id="test" name="test" value="test" onChange={() => {}} />,
    );

    wrapper.simulate('mouseEnter');

    expect(wrapper).toMatchSnapshot();
  });

  it('render not checked, disabled and hover correctly', () => {
    const wrapper = shallow(
      <Radio checked={false} disabled id="test" name="test" value="test" onChange={() => {}} />,
    );

    wrapper.simulate('mouseEnter');

    expect(wrapper).toMatchSnapshot();
  });
});
