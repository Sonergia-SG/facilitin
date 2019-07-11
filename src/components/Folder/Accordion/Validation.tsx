import React from 'react';
import { connect } from 'react-redux';

import { folderFileEnding } from '../../../store/actions/views/folder/folderFileEnding';

import { CheckPoint } from '../../../store/reducer/entities/types';

import isLitige from '../Left/helpers/checkPointInLitige';
import isRejected from '../Left/helpers/checkPointRejected';

interface Props {
  file: { statut: number; id_dp_file: number };
  folderId: number;
  ending: any;
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


  if (checkPoints.some(f => isRejected(f))) {
    return {
      title: 'Rejeter',
      type: 'is-danger',
      disabled: false,
    };
  }

  if (checkPoints.some(f => isLitige(f))) {
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

const Validation = ({
  file, ending, folderId, loading, checkPoints,
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
      onClick={async () => {
        await ending(folderId, file.id_dp_file);
      }}
    >
      {config.title}
    </button>
  );
};

export default connect(null, { ending: folderFileEnding })(Validation);
