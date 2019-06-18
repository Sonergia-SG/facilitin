import React from 'react';
import { OperationFull } from '../../../store/reducer/entities/types';

interface Props {
  data: OperationFull;
}

const EndButton = ({ data }: Props) => {
  const displayButton = data.dossierprimefile
    ? data.dossierprimefile.every(f => f.statut === 15 || f.statut === 10)
    : false;

  if (true || displayButton) {
    return (
      <div className="tile is-child">
        <div className="content has-text-centered">
          <button type="button" className="button is-primary is-outlined is-medium">
            {'Terminer'}
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default EndButton;
