import { act } from 'react-dom/test-utils';
import handleHook from '../../../../tools/test/handleHook';

import useOpenModalOrGoNextAtStatusChange from '../useOpenModalOrGoNextAtStatusChange';

describe('useOpenModalOrGoNextAtStatusChange', () => {
  it('open modal', () => {
    const { result, wrapper } = handleHook(
      useOpenModalOrGoNextAtStatusChange,
      { status: 0 },
      p => Object.values(p),
    );

    wrapper.setProps({ status: 10 });
    setTimeout(() => expect(result[0]).toBe(true), 0);
  });

  it('clode modal manually', () => {
    const { result, wrapper } = handleHook(
      useOpenModalOrGoNextAtStatusChange,
      { status: 0 },
      p => Object.values(p),
    );

    wrapper.setProps({ status: 10 });
    setTimeout(() => expect(result[0]).toBe(true), 0);

    act(() => {
      result[1](false);
    });
    expect(result[0]).toBe(false);
  });

  it('go next on validate', () => {
    const goNext = jest.fn();
    const { result, wrapper } = handleHook(
      useOpenModalOrGoNextAtStatusChange,
      { status: 0, goNext },
      p => Object.values(p),
    );

    wrapper.setProps({ status: 15 });
    expect(goNext).toHaveBeenCalledTimes(1);
    setTimeout(() => expect(result[0]).toBe(false), 0);
  });

  it('go next on missing file', () => {
    const goNext = jest.fn();
    const { result, wrapper } = handleHook(
      useOpenModalOrGoNextAtStatusChange,
      { status: 0, goNext },
      p => Object.values(p),
    );

    wrapper.setProps({ status: -1 });
    expect(goNext).toHaveBeenCalledTimes(0);
    setTimeout(() => expect(result[0]).toBe(false), 0);
  });

  it('go next on incomplet', () => {
    const goNext = jest.fn();
    const { result, wrapper } = handleHook(
      useOpenModalOrGoNextAtStatusChange,
      { status: 0, goNext },
      p => Object.values(p),
    );

    wrapper.setProps({ status: 5 });
    expect(goNext).toHaveBeenCalledTimes(0);
    setTimeout(() => expect(result[0]).toBe(false), 0);
  });

  it('go next on reject', () => {
    const goNext = jest.fn();
    const { result, wrapper } = handleHook(
      useOpenModalOrGoNextAtStatusChange,
      { status: 0, goNext },
      p => Object.values(p),
    );

    wrapper.setProps({ status: 10 });
    expect(goNext).toHaveBeenCalledTimes(0);
    setTimeout(() => expect(result[0]).toBe(false), 0);
  });
});
