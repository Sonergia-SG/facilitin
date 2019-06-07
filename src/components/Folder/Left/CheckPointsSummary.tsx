import React from 'react';

import { OperationFull } from '../../../store/reducer/entities/types';

import fileFolderDisplayType from '../helper/fileFolderDisplayType';

interface Props {
  data: OperationFull;
}

const CheckPointsSummary = ({ data }: Props) => (
  <div className="tile is-child notification ">
    <div className="content">
      {data.dossierprimefile.map((value, index) => (
        <h4
          className={`item_menu_gauche ${index === 0 ? 'left-active' : ''}`}
          key={value.id_file}
          id={`${index}pp`}
        >
          {fileFolderDisplayType(value)}
        </h4>
      ))}
    </div>
  </div>
);

export default CheckPointsSummary;