import React from 'react';
import { OperationFull } from '../../../store/reducer/entities/types';

interface Props {
  title: String;
  data: OperationFull;
  loading: boolean;
}

const GeneralInfos = ({ title, data, loading }: Props) => (
  <div className="tile is-child notification has-text-centered">
    <p className={`title${loading ? ' Loading-Text Loading-Text_one' : ''}`}>{title}</p>
    <p className="subtitle">{data.code_operation}</p>
    <div className="content" />
  </div>
);

export default GeneralInfos;
