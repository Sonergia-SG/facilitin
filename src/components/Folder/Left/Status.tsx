import React from 'react';

import { OperationStatus } from '../../../store/reducer/entities/types';

interface Props {
  status?: OperationStatus;
}

const Status = ({ status }: Props) => {
  if (!status) return null;

  return (
    <p style={{ backgroundColor: status.code_couleur }} className="Left-GeneralInfos-Status">
      {status.label_public}
    </p>
  );
};

export default Status;
