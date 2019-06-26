import React from 'react';
import { connect } from 'react-redux';
import idx from 'idx';

import { CheckPoint } from '../../../store/reducer/entities/types';
import { updateFolderCheckPoint } from '../../../store/actions/views/folder';

import './CheckPoints.css';
import { FolderPendingItem } from '../../../store/reducer/views/folder/types';

interface Props {
  checkPoints: Array<CheckPoint> | undefined;
  fileId: number;
  folderId: number;
  updateCheckPoint: any;
  pending: FolderPendingItem | undefined;
}

const CheckPoints = ({
  checkPoints, fileId, folderId, updateCheckPoint, pending,
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
      <table className="CheckPoints-Table">
        <thead>
          <tr>
            <th>Oui</th>
            <th>Non</th>
            {/* <th /> */}
            <th />
          </tr>
        </thead>
        <tbody>
          {fileCheckPoints.map((value) => {
            const checkPointStatus = idx(
              pending,
              _ => _.checkPoint[value.id_point_controle].status,
            );

            return (
              <tr key={value.id_point_controle}>
                <td className="CheckPoints-Table-Center">
                  <input
                    type="radio"
                    id={`${value.is_controle_file}_yes`}
                    name={`${value.id_point_controle}`}
                    checked={value.pivot.valide === 1}
                    value="yes"
                    disabled={loading || checkPointStatus === 'SENDING'}
                    onChange={() => {
                      updateCheckPoint({
                        folderId,
                        checkPointId: value.id_point_controle,
                        idDpFile: value.pivot.id_dp_file,
                        newValue: 1,
                      });
                    }}
                  />
                </td>
                <td className="CheckPoints-Table-Center">
                  <input
                    type="radio"
                    id={`${value.is_controle_file}_no`}
                    name={`${value.id_point_controle}`}
                    checked={value.pivot.valide === 0}
                    value="no"
                    disabled={loading || checkPointStatus === 'SENDING'}
                    onChange={() => {
                      updateCheckPoint({
                        folderId,
                        checkPointId: value.id_point_controle,
                        idDpFile: value.pivot.id_dp_file,
                        newValue: 0,
                      });
                    }}
                  />
                </td>
                {/* <td className="CheckPoints-Table-Center">Ico</td> */}
                <td>
                  <label className="CheckPoints-CheckPoint-Label" htmlFor={'{value.id_controle}'}>
                    {value.nom}
                  </label>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default connect(
  null,
  { updateCheckPoint: updateFolderCheckPoint },
)(CheckPoints);
