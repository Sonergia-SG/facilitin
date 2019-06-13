import React from 'react';

import { OperationFull, CheckPoint } from '../../../store/reducer/entities/types';

import fileFolderDisplayType from '../helper/fileFolderDisplayType';

import Picto from './Picto'

import './CheckPointSummary.css'

interface Props {
  data: OperationFull;
  selectedAccordion: number | undefined;
  checkPoints: Array<CheckPoint>;
  handleAccordionClick: (index: number) => () => void;
}

const CheckPointsSummary = ({ data, selectedAccordion, handleAccordionClick, checkPoints }: Props) => {
  if (data.dossierprimefile && data.dossierprimefile.length > 0) {
    return (
      <div className="tile is-child notification ">
        <div className="content">
          {data.dossierprimefile.map((value, index) => {
            const currentCheckPoints = checkPoints.filter(c => c.pivot.id_dp_file === value.id_dp_file)
            const validCheckPoints = currentCheckPoints.filter(c => c.pivot.valide === 1)

            return (
              <div
                className="Actions-Left-CheckPointSummary-File"
                key={value.id_file}
                onClick={handleAccordionClick(index)}
                style={{ cursor: 'pointer' }}
              >
                <div className="Actions-Left-CheckPointSummary-Left" >
                  <Picto total={currentCheckPoints.length} valid={validCheckPoints.length} />
                  <h4
                    style={{ margin: 0 }}
                    className={`item_menu_gauche ${selectedAccordion === index ? 'left-active' : ''}`}
                    id={`${index}pp`}
                  >
                    {fileFolderDisplayType(value)}
                  </h4>
                </div>
                <p className="Actions-Left-CheckPointSummary-File-Count" >{validCheckPoints.length}/{currentCheckPoints.length}</p>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
  return null;
};

export default CheckPointsSummary;
