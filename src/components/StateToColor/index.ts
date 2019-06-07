/**
 * Created by stephane.mallaroni on 15/04/2019.
 */

import { CheckPoint, FileFull } from '../../store/reducer/entities/types';

const pointManuelNonCoche = (pointControle: Array<CheckPoint>) => {
  // const nonCoche = !pointControle.some(v => v.controle_valide === 1);
  // return nonCoche;
  return false;
};

const StateToColor = (str: FileFull) => {
  // if (str.nb_bad_controle_auto > 0) return 'accordion_bad_controle';
  // if (str.litige === 1) return 'accordion_litige';

  // const manuelIsEmpty = pointManuelNonCoche(str.point_controle);
  // if (manuelIsEmpty) return 'accordion_empty';

  return 'accordion_ok';
};

export default StateToColor;
