import React, { useState } from 'react';
import { connect, HandleThunkActionCreator } from 'react-redux';
import idx from 'idx';

import { CheckPoint } from '../../../store/reducer/entities/types';
import {
  updateFolderCheckPoint,
  fetchFolder,
} from '../../../store/actions/views/folder';

import './CheckPoints.css';
import { FolderPendingItem } from '../../../store/reducer/views/folder/types';

import Radio from '../../../Common/UIKIT/Form/Radio';
import isRejected from '../Left/helpers/checkPointRejected';
import Modal from '../../../Common/UIKIT/Modal';

interface Props {
  checkPoints: Array<CheckPoint> | undefined;
  fileId: number;
  filename: string;
  folderId: number;
  updateCheckPoint: HandleThunkActionCreator<typeof updateFolderCheckPoint>;
  updateFolder: HandleThunkActionCreator<typeof fetchFolder>;
  lockedByStatus: boolean;
  pending: FolderPendingItem | undefined;
  locked: boolean;
}

export const CheckPointsComponent = ({
  checkPoints,
  fileId,
  filename,
  folderId,
  lockedByStatus,
  updateCheckPoint,
  updateFolder,
  pending,
  locked,
}: Props) => {
  const fileCheckPoints = (checkPoints || []).filter(
    c => c.pivot.id_dp_file === fileId,
  );

  if (fileCheckPoints.length === 0) {
    return (
      <div className="CheckPoints-CheckPoint-Container">
        <h4>Pas de points de controles pour ce fichier</h4>
      </div>
    );
  }

  const [modalState, setModalState] = useState<{
    display: boolean;
    data: { chekcpoint: CheckPoint | undefined };
  }>({ display: false, data: { chekcpoint: undefined } });

  const loading = pending ? !!pending.loading : false;

  return (
    <div className="CheckPoints-CheckPoint-Container">
      <table className="CheckPoints-Table">
        <thead>
          <tr>
            <th>Oui</th>
            <th>Non</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {fileCheckPoints.map((value) => {
            const checkPointStatus = idx(
              pending,
              _ => _.checkPoint[value.id_point_controle].status,
            );

            const disabled = lockedByStatus
              || loading
              || checkPointStatus === 'SENDING'
              || value.automatique === 1
              || locked;

            return (
              <tr key={value.id_point_controle}>
                <td className="CheckPoints-Table-Center">
                  <Radio
                    id={`${value.is_controle_file}_yes`}
                    name={`${value.id_point_controle}`}
                    checked={value.pivot.valide === 1}
                    value="yes"
                    disabled={disabled}
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
                  <Radio
                    id={`${value.is_controle_file}_no`}
                    name={`${value.id_point_controle}`}
                    checked={value.pivot.valide === 0}
                    value="no"
                    disabled={disabled}
                    customColor={isRejected(value) ? '#FF6C60' : '#FCB322'}
                    onChange={() => {
                      if (value.id_penalite === 1) {
                        setModalState({
                          display: true,
                          data: { chekcpoint: value },
                        });
                      } else {
                        updateCheckPoint({
                          folderId,
                          checkPointId: value.id_point_controle,
                          idDpFile: value.pivot.id_dp_file,
                          newValue: 0,
                        });
                      }
                    }}
                  />
                </td>
                <td>
                  <label
                    className="CheckPoints-CheckPoint-Label"
                    htmlFor={'{value.id_controle}'}
                  >
                    {value.nom}
                  </label>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal
        displayModal={modalState.display}
        title="Point de contrôle non conforme"
        message={`La non-validation de ce point de contrôle entraine un rejet du document ${filename}, êtes-vous certain de vouloir continuer ?`}
        actions={{
          type: 'alert',
          cancel: {
            handle: () => {
              setModalState({
                display: false,
                data: { chekcpoint: undefined },
              });
            },
            title: 'Annuler',
          },
          confirm: {
            handle: () => {
              setModalState({
                display: false,
                data: { chekcpoint: undefined },
              });
              const { chekcpoint } = modalState.data;

              if (chekcpoint !== undefined) {
                updateCheckPoint({
                  folderId,
                  checkPointId: chekcpoint.id_point_controle,
                  idDpFile: chekcpoint.pivot.id_dp_file,
                  newValue: 0,
                });

                updateFolder(folderId);
              }
            },
            title: 'Rejet du document',
          },
        }}
      />
    </div>
  );
};

export default connect(
  null,
  { updateCheckPoint: updateFolderCheckPoint, updateFolder: fetchFolder },
)(CheckPointsComponent);
