/* eslint-disable import/no-extraneous-dependencies */
import React, { StatelessComponent } from 'react';
import { mount } from 'enzyme';

interface ToReturn {
  ComponentWithHook: StatelessComponent | undefined;
  wrapper: any | undefined;
  result: any | undefined;
}

const handleHook = (hook: any, initialProps: any, updater: (props: any) => any) => {
  const toReturn: ToReturn = {
    ComponentWithHook: undefined,
    wrapper: undefined,
    result: undefined,
  };

  const ComponentWithHook = (props: any) => {
    toReturn.result = hook(updater(props));
    return null;
  };

  const wrapper = mount(<ComponentWithHook {...initialProps} />);

  toReturn.wrapper = wrapper;
  toReturn.ComponentWithHook = ComponentWithHook;

  return toReturn;
};

export default handleHook;
