import React from 'react';

import { OperationFull } from '../../../store/reducer/entities/types';

import GeneralInfos from './GeneralInfos';
import CheckPointsSummary from './CheckPointsSummary';
import EndButton from './EndButton';
import SecondaryData from './SecondaryData';

interface Props {
  title: String;
  data: OperationFull;
  loading: boolean;
}

const Left = ({ title, data, loading }: Props) => (
  <div className="tile is-vertical is-3">
    <div className="tile is-parent is-vertical">
      <GeneralInfos loading={loading} title={title} data={data} />
      <SecondaryData data={data} />
      <CheckPointsSummary data={data} />
      <EndButton />
    </div>
  </div>
);

export default Left;
