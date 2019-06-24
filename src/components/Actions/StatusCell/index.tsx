import React from 'react';

import { CheckPoint } from '../../../store/reducer/entities/types';

import Valid from './Valid';
import Invalid from './Invalid';

interface Props {
  original: {
    point_controles: [CheckPoint];
  };
}

const StatusCell = ({ original }: Props) => {
  const cleanCheckPoints = original.point_controles.filter(c => c.pivot.id_dp_file !== null);

  const totalCheckPoints = cleanCheckPoints.length;
  const validCheckPoints = cleanCheckPoints.filter(c => c.pivot.valide).length;
  const invalidCheckPoints = cleanCheckPoints.filter(c => c.automatique && !c.pivot.valide).length;

  return (
    <div style={{ display: 'flex' }}>
      <Invalid count={invalidCheckPoints} />
      <Valid count={validCheckPoints} total={totalCheckPoints} />
    </div>
  );
};

export default StatusCell;
