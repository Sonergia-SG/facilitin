/* eslint-disable @typescript-eslint/camelcase */

import StateToColor from '../index.ts';

describe('Test StateToColor', () => {
  xit('have good result with nb_bad_controle_auto > 0', () => {
    const str = {
      point_controle: [{}],
      nb_bad_controle_auto: 1,
      litige: 0,
    };
    const color = StateToColor(str);

    expect(color).toBe('accordion_bad_controle');
  });

  xit('have good result with litige === 1', () => {
    const str = {
      point_controle: [{}],
      nb_bad_controle_auto: 0,
      litige: 1,
    };
    const color = StateToColor(str);

    expect(color).toBe('accordion_litige');
  });

  xit('have good result with empty accordion', () => {
    const str = {
      point_controle: [{}],
      nb_bad_controle_auto: 0,
      litige: 0,
    };
    const color = StateToColor(str);

    expect(color).toBe('accordion_empty');
  });

  xit('have good result with accordion ok', () => {
    const str = {
      point_controle: [
        {
          controle_valide: 0,
        },
        {
          controle_valide: 1,
        },
      ],
      nb_bad_controle_auto: 0,
      litige: 0,
    };
    const color = StateToColor(str);

    expect(color).toBe('accordion_ok');
  });

  xit('have good result with empty accordion for all controle valide 0', () => {
    const str = {
      point_controle: [
        {
          controle_valide: 0,
        },
        {
          controle_valide: 0,
        },
      ],
      nb_bad_controle_auto: 0,
      litige: 0,
    };
    const color = StateToColor(str);

    expect(color).toBe('accordion_empty');
  });
});
