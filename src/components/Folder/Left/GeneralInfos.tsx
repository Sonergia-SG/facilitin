import React from 'react';

import './GeneralInfos.css';

import { OperationFull, CheckPoint } from '../../../store/reducer/entities/types';

import inLitige from './helpers/checkPointInLitige';

import Status from './Status';

interface Props {
  title: string;
  data: OperationFull;
  loading: boolean;
  checkPoints: Array<CheckPoint>;
}

const GeneralInfos = ({
  title, data, loading, checkPoints,
}: Props) => {
  const allCheckPoints = checkPoints.filter(c => c.pivot.id_dp_file !== null);
  const litigeCheckPoints = allCheckPoints.filter(c => inLitige(c));

  const nbFiles = data.dossierprimefile ? data.dossierprimefile.length : 0;
  const litigeFiles = data.dossierprimefile
    ? data.dossierprimefile.filter(c => c.statut === 10).length
    : 0;
  const validFiles = data.dossierprimefile
    ? data.dossierprimefile.filter(c => c.statut === 15).length
    : 0;

  return (
    <div style={{ flexGrow: 0 }} className="tile is-child notification has-text-centered">
      <p
        className={`Left-GeneralInfos-Title title${
          loading ? ' Loading-Text Loading-Text_one' : ''
        }`}
      >
        {title}
      </p>
      <p className="subtitle">{data.code_operation}</p>
      <Status status={data.statut} />
      <div className="content" />
      <div className="Left-GeneralInfos-Pictos">
        <div className="Left-GeneralInfos-Picto">
          <i className="fas fa-exclamation-triangle" style={{ color: '#F61616' }} />
          <p>{litigeCheckPoints.length}</p>
        </div>
        <div className="Left-GeneralInfos-Picto">
          <i className="fas fa-exclamation-triangle" style={{ color: '#FBD44A' }} />
          <p>{`${litigeFiles}/${nbFiles}`}</p>
        </div>
        <div className="Left-GeneralInfos-Picto">
          <i className="fas fa-check-circle" style={{ color: '#2BA048' }} />
          <p>{`${validFiles}/${nbFiles}`}</p>
        </div>
      </div>
    </div>
  );
};

export default GeneralInfos;
