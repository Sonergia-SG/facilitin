import { OperationFull } from '../../../../store/reducer/entities/types';
import { Sorted } from '../../../../store/reducer/views/list/type';

import getValue from './getValue';

const sort = (sorted: Array<Sorted>, operations: Array<OperationFull>) => (sorted.length > 0
  ? operations.sort((a, b) => {
    const key = sorted[0].id;
    const va = getValue(a, key);
    const vb = getValue(b, key);

    if (va === vb) return 0;

    if (sorted[0].desc) return va > vb ? -1 : 1;

    return va > vb ? 1 : -1;
  })
  : operations);

export default sort;
