// @flow

/**
 * Created by stephane.mallaroni on 15/04/2019.
 */

import { type CheckPoint, type FileFullDenormalized } from '../../store/reducer/entities/flowTypes';

type PointManuelNonCoche = (checkPoint: Array<CheckPoint>) => boolean;

const pointManuelNonCoche: PointManuelNonCoche = (checkPoint) => {
  const nonCoche = !checkPoint.some(v => v.controle_valide === 1);
  return nonCoche;
};

type StateToColorType = (
  str: FileFullDenormalized
) => 'accordion_bad_controle' | 'accordion_litige' | 'accordion_empty' | 'accordion_ok';

const StateToColor: StateToColorType = (str) => {
  if (str.nb_bad_controle_auto > 0) return 'accordion_bad_controle';
  if (str.litige === 1) return 'accordion_litige';

  const manuelIsEmpty = pointManuelNonCoche(str.point_controle);
  if (manuelIsEmpty) return 'accordion_empty';

  return 'accordion_ok';
};

export default StateToColor;
