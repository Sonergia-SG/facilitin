import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';

import { CheckPoint } from '../../../store/reducer/entities/types';
import { AppState } from '../../../store'
import { updateFolderCheckPoint } from '../../../store/actions/views/folder'

import './CheckPoints.css';
import { FolderPendingItem } from '../../../store/reducer/views/folder/types';

interface Props {
  checkPoints: Array<CheckPoint> | undefined;
  fileId: number;
  pending: FolderPendingItem | undefined;
  folderId: number;
  updateFolderCheckPoint: any;
}

const CheckPoints = ({ checkPoints, fileId, pending, folderId, updateFolderCheckPoint }: Props) => {
  const fileCheckPoints = (checkPoints || []).filter(c => c.pivot.id_dp_file === fileId);

  if (fileCheckPoints.length === 0) {
    return (
      <div className="CheckPoints-CheckPoint-Container">
        <h4>Pas de points de controles pour ce fichier</h4>
      </div>
    );
  }

  return (
    <div className="CheckPoints-CheckPoint-Container">
      {fileCheckPoints.map((value) => {
        const checked = value.pivot.valide ? ' checked' : '';

        return (
          <div className="CheckPoints-CheckPoint-Line" key={value.id_point_controle}>
            <input
              type="checkbox"
              name={'{value.id_controle}'}
              checked={!!checked}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                updateFolderCheckPoint({ folderId, checkPointId: value.id_point_controle })
              }}
            />
            <label className="CheckPoints-CheckPoint-Label" htmlFor={'{value.id_controle}'}>
              {' '}
              {value.nom}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default connect((s: AppState) => ({

}), { updateFolderCheckPoint })(CheckPoints);
