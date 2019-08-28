import { act } from 'react-dom/test-utils';
import handleHook from '../../../../tools/test/handleHook';

import useOpenModalOrGoNextAtStatusChange from '../useOpenModalOrGoNextAtStatusChange';

describe('TestHooks', () => {
  it('test', () => {
    const { result, wrapper } = handleHook(
      useOpenModalOrGoNextAtStatusChange,
      { status: 0 },
      p => p.status,
    );

    setTimeout(() => expect(result[0]).toBe(false), 0);

    wrapper.setProps({ status: 5 });
    setTimeout(() => expect(result[0]).toBe(false), 0);

    wrapper.setProps({ status: 10 });
    setTimeout(() => expect(result[0]).toBe(true), 0);

    act(() => {
      result[1](false);
    });
    expect(result[0]).toBe(false);
  });
});
