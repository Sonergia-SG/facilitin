import React from 'react';

import { CheckPoint } from '../../../store/reducer/entities/types';

interface Props {
  checkPoint: CheckPoint;
}

const resolveIco = (c: CheckPoint) => {
  if (c.id_penalite === 2 && c.pivot.valide === 0) {
    return {
      key: 'error',
      name: 'fa-exclamation-triangle',
      color: '#F61616',
    };
  }

  if (c.id_penalite === 1 && c.pivot.valide === 0) {
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
    <div key={icoConfig.key}>
      <i className={`fas ${icoConfig.name}`} style={{ color: icoConfig.color }} />
    </div>
  );
};

export default Picto;
