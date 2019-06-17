import React from 'react';

import './GeneralInfos.css';

import { OperationFull, CheckPoint } from '../../../store/reducer/entities/types';

import inLitige from './helpers/checkPointInLitige';

interface Props {
  title: String;
  data: OperationFull;
  loading: boolean;
  checkPoints: Array<CheckPoint>;
}

const GeneralInfos = ({
  title, data, loading, checkPoints,
}: Props) => {
  const allCheckPoints = checkPoints.filter(c => c.pivot.id_dp_file !== null);

  const validCheckPoints = allCheckPoints.filter(c => c.pivot.valide);
  const litigeCheckPoints = allCheckPoints
    .filter(c => inLitige(c, data))
    .filter(c => !c.pivot.valide);
  const invalidCheckPoints = allCheckPoints
    .filter(c => !inLitige(c, data))
    .filter(c => !c.pivot.valide);

  return (
    <div className="tile is-child notification has-text-centered">
      <p className={`title${loading ? ' Loading-Text Loading-Text_one' : ''}`}>{title}</p>
      <p className="subtitle">{data.code_operation}</p>
      <div className="content" />
      <div className="Left-GeneralInfos-Pictos">
        <div className="Left-GeneralInfos-Picto">
          <i className="fas fa-exclamation-triangle" style={{ color: '#F61616' }} />
          <p>{`${litigeCheckPoints.length}/${allCheckPoints.length}`}</p>
        </div>
        <div className="Left-GeneralInfos-Picto">
          <i className="fas fa-exclamation-triangle" style={{ color: '#FBD44A' }} />
          <p>{`${invalidCheckPoints.length}/${allCheckPoints.length}`}</p>
        </div>
        <div className="Left-GeneralInfos-Picto">
          <i className="fas fa-check-circle" style={{ color: '#2BA048' }} />
          <p>{`${validCheckPoints.length}/${allCheckPoints.length}`}</p>
        </div>
      </div>
    </div>
  );
};

export default GeneralInfos;
