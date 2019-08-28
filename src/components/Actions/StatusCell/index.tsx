import React from 'react';

import { CheckPoint } from '../../../store/reducer/entities/types';
import ProgressBar from '../../../Common/ProgressBar';

import isRejected from '../../Folder/Left/helpers/checkPointRejected';
import isLitige from '../../Folder/Left/helpers/checkPointInLitige';

interface Props {
  original: {
    point_controles: Array<CheckPoint>;
  };
}

const StatusCell = ({ original }: Props) => {
  const cleanCheckPoints = original.point_controles.filter(c => c.pivot.id_dp_file !== null);

  const totalCheckPoints = cleanCheckPoints.length;
  const validCheckPoints = cleanCheckPoints.filter(c => c.pivot.valide === 1).length;
  const invalidCheckPoints = cleanCheckPoints.filter(c => isRejected(c)).length;
  const litigeCheckPoints = cleanCheckPoints.filter(c => isLitige(c)).length;

  return (
    <div style={{ width: 100 }}>
      <ProgressBar
        values={{
          '#5cb85c': validCheckPoints,
          '#f0ad4e': litigeCheckPoints,
          '#d9534f': invalidCheckPoints,
          '#f0f2f7': totalCheckPoints - validCheckPoints - litigeCheckPoints - invalidCheckPoints,
        }}
      />
    </div>
  );
};

export default StatusCell;
