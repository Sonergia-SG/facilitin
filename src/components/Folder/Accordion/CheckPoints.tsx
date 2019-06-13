import React from 'react';
import { CheckPoint } from '../../../store/reducer/entities/types';

import './CheckPoints.css';

interface Props {
  checkPoints: Array<CheckPoint> | undefined;
  fileId: number;
}

const CheckPoints = ({ checkPoints, fileId }: Props) => {
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
            <input type="checkbox" name={'{value.id_controle}'} defaultChecked={!!checked} />
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

export default CheckPoints;
