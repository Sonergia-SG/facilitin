import { schema } from 'normalizr';

// eslint-disable-next-line import/prefer-default-export
export const folder = new schema.Entity('folders', {}, { idAttribute: 'id_dp_operation' });
