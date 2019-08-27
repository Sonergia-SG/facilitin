import { dataFilter } from '../index';

import {
  OperationFull,
  FolderFull,
} from '../../../store/reducer/entities/types';
import { ListSearch } from '../../../store/reducer/views/list/type';

const dataSet: Array<OperationFull> = [
  {
    id_dp_operation: 1234,
    id_dossierprime: 12345,
    id_operation: 123456,
    code_operation: '12QS',
    statut: undefined,
    forms: { moa: [], moe: [], site: [] },
    moderemuneration: {
      id_remuneration: 21347,
      delai_instruction: '110 jours',
    },
    dossierprime: undefined,
    dossierprimefile: undefined,
    point_controles: [],
  },
  {
    id_dp_operation: 1235,
    id_dossierprime: 12346,
    id_operation: 123457,
    code_operation: '🔑',
    statut: {
      label_public: 'label',
    },
    forms: { moa: [], moe: [], site: [] },
    moderemuneration: {
      id_remuneration: 21347,
      delai_instruction: '📅',
    },
    dossierprime: undefined,
    dossierprimefile: undefined,
    point_controles: [],
  },
  {
    id_dp_operation: 1236,
    id_dossierprime: 12347,
    id_operation: 123458,
    code_operation: '🔑',
    statut: {
      label_public: '😎',
    },
    forms: { moa: [], moe: [], site: [] },
    moderemuneration: {
      id_remuneration: 21347,
      delai_instruction: '📅',
    },
    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    dossierprime: {
      moa_nom: 'John',
      moa_prenom: 'Doe',
      moa_denomination: '🤪',
    } as FolderFull,
    dossierprimefile: undefined,
    point_controles: [],
  },
  {
    id_dp_operation: 1237,
    id_dossierprime: 12348,
    id_operation: 123459,
    code_operation: '🔑',
    statut: {
      label_public: '😎',
    },
    forms: { moa: [], moe: [], site: [] },
    moderemuneration: {
      id_remuneration: 21347,
      delai_instruction: '📅',
    },
    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    dossierprime: {
      moa_nom: '🤓',
      moa_prenom: '🧐',
      moa_denomination: '🤪',
    } as FolderFull,
    dossierprimefile: undefined,
    point_controles: [],
  },
];

const defaultSearch: ListSearch = {
  id_dossierprime: '',
  id_dp_operation: '',
  etat: '',
  delai: '',
  moa: '',
  code_operation: '',
};

describe('Action dataFilter', () => {
  it('return all with no filters', () => {
    const result = dataFilter(dataSet, defaultSearch);

    expect(result).toHaveLength(4);
    expect(result[0].id_operation).toEqual(123456);
    expect(result[1].id_operation).toEqual(123457);
    expect(result[2].id_operation).toEqual(123458);
    expect(result[3].id_operation).toEqual(123459);
  });

  it('return good result with id_dossierprime filter', () => {
    const result = dataFilter(dataSet, {
      ...defaultSearch,
      id_dossierprime: '12345',
    });

    expect(result).toHaveLength(1);
    expect(result[0].id_operation).toEqual(123456);
  });

  it('return good result with id_dp_operation filter', () => {
    const result = dataFilter(dataSet, {
      ...defaultSearch,
      id_dp_operation: '1234',
    });

    expect(result).toHaveLength(1);
    expect(result[0].id_operation).toEqual(123456);
  });

  it('return good result with etat (insensitive case)', () => {
    const result = dataFilter(dataSet, {
      ...defaultSearch,
      etat: 'LABEL',
    });

    expect(result).toHaveLength(1);
    expect(result[0].id_operation).toEqual(123457);
  });

  it('return good result with delai (insensitive case)', () => {
    const result = dataFilter(dataSet, {
      ...defaultSearch,
      delai: '110 jours',
    });

    expect(result).toHaveLength(1);
    expect(result[0].id_operation).toEqual(123456);
  });

  it('return good result with moa (insensitive case)', () => {
    const result = dataFilter(dataSet, {
      ...defaultSearch,
      moa: 'JOHN DOE',
    });

    expect(result).toHaveLength(1);
    expect(result[0].id_operation).toEqual(123458);
  });

  it('return good result with code_operation (insensitive case)', () => {
    const result = dataFilter(dataSet, {
      ...defaultSearch,
      code_operation: '12qs',
    });

    expect(result).toHaveLength(1);
    expect(result[0].id_operation).toEqual(123456);
  });
});
