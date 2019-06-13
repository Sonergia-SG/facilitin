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
  selectedAccordion: number | undefined;
  handleAccordionClick: (index: number) => () => void;
}

const Left = ({
  title, data, loading, selectedAccordion, handleAccordionClick,
}: Props) => (
  <div className="tile is-vertical is-3">
    <div className="tile is-parent is-vertical">
      <GeneralInfos loading={loading} title={title} data={data} />
      <SecondaryData data={data} />
      <CheckPointsSummary
        checkPoints={data.point_controles}
        handleAccordionClick={handleAccordionClick}
        selectedAccordion={selectedAccordion}
        data={data}
      />
      <EndButton />
    </div>
  </div>
);

export default Left;
