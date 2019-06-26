import { act } from 'react-dom/test-utils';
import handleHook from '../../../../tools/test/handleHook';

import useOpenModalAfterLoading from '../useOpenModalAfterLoading';

describe('TestHooks', () => {
  it('test', () => {
    const { result, wrapper } = handleHook(
      useOpenModalAfterLoading,
      { value: false },
      p => p.value,
    );

    setTimeout(() => expect(result[0]).toBe(false), 0);

    wrapper.setProps({ value: true });
    setTimeout(() => expect(result[0]).toBe(false), 0);

    wrapper.setProps({ value: false });
    setTimeout(() => expect(result[0]).toBe(true), 0);

    act(() => {
      result[1](false);
    });
    expect(result[0]).toBe(false);
  });
});
