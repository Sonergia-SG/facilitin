import { schema } from 'normalizr';
import { CheckPoint } from '../types';

export const checkPointCategory = new schema.Entity(
  'checkPointCategories',
  {},
  { idAttribute: 'id_point_controle_categorie' },
);

export const checkPoint = new schema.Entity(
  'checkPoints',
  {
    pointcontrolcategories: checkPointCategory,
  },
  { idAttribute: (value: CheckPoint) => `${value.id_point_controle}_${value.pivot.id_dp_file}` },
);

export const file = new schema.Entity('files', {}, { idAttribute: 'id_dp_file' });

export const folder = new schema.Entity('folders', {}, { idAttribute: 'id_dossierprime' });

export const operation = new schema.Entity(
  'operations',
  {
    dossierprime: folder,
    dossierprimefile: [file],
    point_controles: [checkPoint],
  },
  { idAttribute: 'id_dp_operation' },
);

export const user = new schema.Entity('users', {}, { idAttribute: 'id_user' });

export const comment = new schema.Entity(
  'comments',
  {
    user,
  },
  { idAttribute: 'id_log' },
);
