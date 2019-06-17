import idx from 'idx';
import { OperationFull, CheckPoint } from '../../../../store/reducer/entities/types';

const inLitige = (c: CheckPoint, d: OperationFull) => {
  const file = idx(d, _ => _.dossierprimefile.find(f => f.id_dp_file === c.pivot.id_dp_file));

  return file ? file.statut === 10 : false;
};

export default inLitige;
