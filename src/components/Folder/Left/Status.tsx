import React from 'react';

import { OperationStatus } from '../../../store/reducer/entities/types';

interface Props {
  status?: OperationStatus;
}

const backgroundColor = (status?: number) => {
  switch (status) {
    case -40:
      return '#7d8433';
    case -5:
      return '#ff7aff';
    case -30:
    case 1:
    case 3:
    case 0:
      return '#57c8f1';
    case 5:
    case -10:
      return '#e4ba00';
    case -15:
    case 13:
      return '#f9741b';
    case 15:
    case 16:
    case 17:
    case 2:
      return '#95b75d';
    case 8:
    case 10:
    case 18:
    case 21:
      return '#ec6459';
    case -20:
    case 20:
    default:
      return '#607d8b';
  }
};

const Status = ({ status }: Props) => {
  if (!status) return null;

  return (
    <p
      style={{ backgroundColor: backgroundColor(status.code_statut) }}
      className="Left-GeneralInfos-Status"
    >
      {status.label_public}
    </p>
  );
};

export default Status;
