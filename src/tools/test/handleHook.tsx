/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { mount } from 'enzyme';

const handleHook = (hook, initialProps, updater) => {
  const toReturn = {
    ComponentWithHook: undefined,
    wrapper: undefined,
    result: undefined,
  };

  const ComponentWithHook = (props) => {
    toReturn.result = hook(updater(props));
    return null;
  };

  const wrapper = mount(<ComponentWithHook {...initialProps} />);

  toReturn.wrapper = wrapper;
  toReturn.ComponentWithHook = ComponentWithHook;

  return toReturn;
};

export default handleHook;
