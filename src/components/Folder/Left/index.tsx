import React from 'react';

import { OperationFull } from '../../../store/reducer/entities/types';

import GeneralInfos from './GeneralInfos';
import CheckPointsSummary from './CheckPointsSummary';
import EndButton from './EndButton';
import SecondaryData from './SecondaryData';

interface Props {
  title: String;
  data: OperationFull;
}

const Left = ({ title, data }: Props) => (
  <div className="tile is-vertical is-3">
    <div className="tile is-parent is-vertical">
      <GeneralInfos title={title} data={data} />
      <SecondaryData data={data} />
      <CheckPointsSummary data={data} />
      <EndButton />
    </div>
  </div>
);

export default Left;
