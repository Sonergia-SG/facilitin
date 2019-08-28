/* eslint-disable import/no-extraneous-dependencies */
import React, { StatelessComponent, FunctionComponent } from 'react';
import { mount } from 'enzyme';

interface ToReturn<T> {
  ComponentWithHook: FunctionComponent<T> | undefined;
  wrapper: any | undefined;
  result: any | undefined;
}

type HandleHook = <T extends {}, R>(
  hook: (...args: Array<any>) => R,
  initialProps: T,
  updater: (props: T) => any
) => ToReturn<T>;

const handleHook: HandleHook = (hook, initialProps, updater) => {
  const toReturn: ToReturn<typeof initialProps> = {
    ComponentWithHook: undefined,
    wrapper: undefined,
    result: undefined,
  };

  const ComponentWithHook = (props: typeof initialProps) => {
    toReturn.result = hook(updater(props));
    return null;
  };

  const wrapper = mount(<ComponentWithHook {...initialProps} />);

  toReturn.wrapper = wrapper;
  toReturn.ComponentWithHook = ComponentWithHook;

  return toReturn;
};

export default handleHook;
