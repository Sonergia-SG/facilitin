import React from 'react';

import { OperationFull } from '../../../store/reducer/entities/types';

import fileFolderDisplayType from '../helper/fileFolderDisplayType';

interface Props {
  data: OperationFull;
  selectedAccordion: number | undefined;
}

const CheckPointsSummary = ({ data, selectedAccordion }: Props) => {
  if (data.dossierprimefile && data.dossierprimefile.length > 0) {
    return (
      <div className="tile is-child notification ">
        <div className="content">
          {data.dossierprimefile.map((value, index) => (
            <h4
              className={`item_menu_gauche ${selectedAccordion === index ? 'left-active' : ''}`}
              key={value.id_file}
              id={`${index}pp`}
            >
              {fileFolderDisplayType(value)}
            </h4>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default CheckPointsSummary;
