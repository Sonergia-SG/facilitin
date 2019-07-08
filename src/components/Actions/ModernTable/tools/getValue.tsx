import { OperationFull } from '../../../../store/reducer/entities/types';

import { SortedId } from '../../../../store/reducer/views/list/type';

const getValue = (v: OperationFull, key: SortedId) => {
  switch (key) {
    case 'etat':
      return v.statut ? v.statut.label_public || ' - ' : ' - ';
    case 'moa':
      return v.dossierprime
        ? `${v.dossierprime.moa_nom} ${v.dossierprime.moa_prenom} ${
          v.dossierprime.moa_denomination
        }`
        : ' - ';
    case 'delai':
      return v.moderemuneration.delai_instruction;
    default:
      return v[key];
  }
};

export default getValue;
