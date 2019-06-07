import React from 'react';
import { OperationFull } from '../../../store/reducer/entities/types';

interface Props {
  title: String;
  data: OperationFull;
}

const GeneralInfos = ({ title, data }: Props) => (
  <div className="tile is-child notification has-text-centered">
    <p className="title">{title}</p>
    <p className="subtitle">{data.code_operation}</p>
    <div className="content" />
  </div>
);

export default GeneralInfos;
