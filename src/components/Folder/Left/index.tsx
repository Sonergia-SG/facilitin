import React from 'react';

import { OperationFull } from '../../../store/reducer/entities/types';

import GeneralInfos from './GeneralInfos';
import CheckPointsSummary from './CheckPointsSummary';
import EndButton from './EndButton';
import SecondaryData from './SecondaryData';
import { FolderPendingItem } from '../../../store/reducer/views/folder/types';

import './Left.css';

interface Props {
  title: string;
  data: OperationFull;
  loading: boolean;
  selectedAccordion: number | undefined;
  pending: FolderPendingItem | undefined;
  handleAccordionClick: (index: number) => () => void;
}

const Left = ({
  title,
  data,
  loading,
  selectedAccordion,
  handleAccordionClick,
  pending,
}: Props) => (
  <div className="Left-container">
    <GeneralInfos loading={loading} title={title} data={data} checkPoints={data.point_controles} />
    <SecondaryData data={data} />
    <CheckPointsSummary
      checkPoints={data.point_controles}
      handleAccordionClick={handleAccordionClick}
      selectedAccordion={selectedAccordion}
      data={data}
    />
    <EndButton pending={pending} data={data} />
  </div>
);

export default Left;
