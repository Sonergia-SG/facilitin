import React from 'react';

import { CheckPoint } from '../../../store/reducer/entities/types';
import isLitige from '../Left/helpers/checkPointInLitige';
import isRejected from '../Left/helpers/checkPointRejected';

interface Props {
  checkPoint: CheckPoint;
}

const resolveIco = (c: CheckPoint) => {
  if (isRejected(c)) {
    return {
      key: 'error',
      name: 'fa-exclamation-triangle',
      color: '#F61616',
    };
  }

  if (isLitige(c)) {
    return {
      key: 'warning',
      name: 'fa-exclamation-triangle',
      color: '#FBD44A',
    };
  }

  if (c.pivot.valide === -1) {
    return {
      key: 'untraited',
      name: 'fa-circle',
      color: '#444',
    };
  }

  if (c.pivot.valide === 1) {
    return {
      key: 'ok',
      name: 'fa-check-circle',
      color: '#2BA048',
    };
  }

  return {
    key: 'untraited',
    name: 'fa-circle',
    color: '#444',
  };
};

const Picto = ({ checkPoint }: Props) => {
  const icoConfig = resolveIco(checkPoint);

  return (
    <div style={{ minWidth: 26 }} key={icoConfig.key}>
      <i className={`fas ${icoConfig.name}`} style={{ color: icoConfig.color }} />
    </div>
  );
};

export default Picto;
