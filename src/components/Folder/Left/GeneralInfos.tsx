import React from 'react';

import './GeneralInfos.css';

import { CheckPoint, OperationStatus, FileFull } from '../../../store/reducer/entities/types';

import Card, { DarkHeader } from '../../../Common/UIKIT/Card';

import inLitige from './helpers/checkPointInLitige';
import rejected from './helpers/checkPointRejected';

import Status from './Status';

export interface Props {
  title: string;
  data: {
    code_operation: string;
    statut?: OperationStatus;
    dossierprimefile?: Array<FileFull>;
  };
  loading: boolean;
  checkPoints: Array<CheckPoint>;
}

const GeneralInfos = ({
  title, data, loading, checkPoints,
}: Props) => {
  const dpFileIds = (data.dossierprimefile || []).map(f => f.id_dp_file);
  const allCheckPoints = checkPoints
    .filter(c => c.pivot.id_dp_file !== null)
    .filter(c => dpFileIds.includes(Number(c.pivot.id_dp_file)));
  const rejectedCheckPoints = allCheckPoints.filter(c => rejected(c));
  const litigeCheckPoints = allCheckPoints.filter(c => inLitige(c));
  const untraitedCheckPoints = allCheckPoints.filter(c => c.pivot.valide === -1);
  const validCheckPoints = allCheckPoints.filter(c => c.pivot.valide === 1);

  return (
    <Card style={{ flexGrow: 0, marginTop: 0, position: 'relative' }}>
      <DarkHeader>
        <h1 className={`Left-GeneralInfos-Title${loading ? ' Loading-Text Loading-Text_one' : ''}`}>
          {title}
        </h1>
        <h2>{data.code_operation}</h2>
      </DarkHeader>
      <Status status={data.statut} />
      <div className="content" />
      <div className="Left-GeneralInfos-Pictos">
        <div className="Left-GeneralInfos-Picto">
          <i className="fas fa-exclamation-triangle" style={{ color: '#F61616' }} />
          <p>{`${rejectedCheckPoints.length}/${allCheckPoints.length}`}</p>
        </div>
        <div className="Left-GeneralInfos-Picto">
          <i className="fas fa-exclamation-triangle" style={{ color: '#FBD44A' }} />
          <p>{`${litigeCheckPoints.length}/${allCheckPoints.length}`}</p>
        </div>
        <div className="Left-GeneralInfos-Picto">
          <i className="fas fa-circle" style={{ color: '#444' }} />
          <p>{`${untraitedCheckPoints.length}/${allCheckPoints.length}`}</p>
        </div>
        <div className="Left-GeneralInfos-Picto">
          <i className="fas fa-check-circle" style={{ color: '#2BA048' }} />
          <p>{`${validCheckPoints.length}/${allCheckPoints.length}`}</p>
        </div>
      </div>
    </Card>
  );
};

export default GeneralInfos;
