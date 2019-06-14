import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';

import { CheckPoint } from '../../../store/reducer/entities/types';
import { AppState } from '../../../store';
import { updateFolderCheckPoint } from '../../../store/actions/views/folder';

import './CheckPoints.css';
import { FolderPendingItem } from '../../../store/reducer/views/folder/types';
import idx from 'idx';

interface Props {
  checkPoints: Array<CheckPoint> | undefined;
  fileId: number;
  folderId: number;
  updateFolderCheckPoint: any;
  pending: FolderPendingItem | undefined;
}

const CheckPoints = ({
  checkPoints, fileId, folderId, updateFolderCheckPoint, pending,
}: Props) => {
  const fileCheckPoints = (checkPoints || []).filter(c => c.pivot.id_dp_file === fileId);

  if (fileCheckPoints.length === 0) {
    return (
      <div className="CheckPoints-CheckPoint-Container">
        <h4>Pas de points de controles pour ce fichier</h4>
      </div>
    );
  }

  const loading = pending ? !!pending.loading : true;

  return (
    <div className="CheckPoints-CheckPoint-Container">
      {fileCheckPoints.map((value) => {
        const checked = value.pivot.valide ? ' checked' : '';
        const checkPointStatus = idx(pending, _ => _.checkPoint[value.id_point_controle].status)

        return (
          <div className="CheckPoints-CheckPoint-Line" key={value.id_point_controle}>
            <input
              type="checkbox"
              name={'{value.id_controle}'}
              checked={!!checked}
              disabled={loading || checkPointStatus === 'sending'}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                updateFolderCheckPoint({
                  folderId,
                  checkPointId: value.id_point_controle,
                  idDpFile: value.pivot.id_dp_file,
                });
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

export default connect(
  (s: AppState) => ({}),
  { updateFolderCheckPoint },
)(CheckPoints);
