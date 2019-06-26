import React from 'react';

import { CheckPoint } from '../../../store/reducer/entities/types';
import { addMessageToQueue } from '../../Alert';

interface Props {
  file: { statut: number; id_dp_file: number };
  folderId: number;
  inLitige: any;
  goNext: () => void;
  loading: boolean;
  checkPoints: Array<CheckPoint> | undefined;
}

const getConfig = (checkPoints: Array<CheckPoint>) => {
  if (checkPoints.every(f => f.pivot.valide === 1)) {
    return {
      title: 'Valider',
      type: 'is-success',
      disabled: false,
    };
  }


  if (checkPoints.some(f => f.pivot.valide === 0 && f.id_penalite === 2)) {
    return {
      title: 'Rejeter',
      type: 'is-danger',
      disabled: false,
    };
  }

  if (checkPoints.some(f => f.pivot.valide === 0 && f.id_penalite === 1)) {
    return {
      title: 'Litige',
      type: 'is-warning',
      disabled: false,
    };
  }

  return {
    title: 'Fichier en cours d\'instruction',
    type: 'is-light',
    disabled: true,
  };
};

const Litige = ({
  file, inLitige, folderId, loading, checkPoints, goNext,
}: Props) => {
  const fileCheckPoints = (checkPoints || []).filter(c => c.pivot.id_dp_file === file.id_dp_file);

  const config = getConfig(fileCheckPoints);

  return (
    <button
      type="button"
      style={{ transition: 'background-color 0.4s ease' }}
      className={`button ${config.type} is-pulled-right${
        loading ? ' is-loading' : ''
      }`}
      disabled={config.disabled}
      id="button-litige"
      onClick={() => {
        addMessageToQueue({
          duration: 3000,
          message: 'fake action',
          type: 'warning',
        });
        goNext();
      }}
    >
      {config.title}
    </button>
  );
};

export default Litige;
