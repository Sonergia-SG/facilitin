import { schema } from 'normalizr';

export const checkPoint = new schema.Entity(
  'checkPoints',
  {},
  { idAttribute: 'id_controle' },
);

export const file = new schema.Entity(
  'files',
  {
    point_controle: [checkPoint],
  },
  { idAttribute: 'id_file' },
);

export const folder = new schema.Entity(
  'folders',
  {
    documents: [file],
  },
  { idAttribute: 'id_dp_operation' },
);
