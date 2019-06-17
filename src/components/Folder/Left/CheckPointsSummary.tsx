import React from 'react';

import { OperationFull, CheckPoint } from '../../../store/reducer/entities/types';

import fileFolderDisplayType from '../helper/fileFolderDisplayType';

import Picto from './Picto';

import './CheckPointSummary.css';

interface Props {
  data: OperationFull;
  selectedAccordion: number | undefined;
  checkPoints: Array<CheckPoint>;
  handleAccordionClick: (index: number) => () => void;
}

const CheckPointsSummary = ({
  data,
  selectedAccordion,
  handleAccordionClick,
  checkPoints,
}: Props) => {
  if (data.dossierprimefile && data.dossierprimefile.length > 0) {
    return (
      <div className="tile is-child notification ">
        <div className="content">
          {data.dossierprimefile.map((file, index) => {
            const currentCheckPoints = checkPoints.filter(
              c => c.pivot.id_dp_file === file.id_dp_file,
            );
            const validCheckPoints = currentCheckPoints.filter(c => c.pivot.valide === 1);

            const active = selectedAccordion === index;

            return (
              <div
                className="Actions-Left-CheckPointSummary-File"
                role="button"
                tabIndex={0}
                key={file.id_dp_file}
                onClick={handleAccordionClick(index)}
                onKeyPress={handleAccordionClick(index)}
                style={{ cursor: 'pointer' }}
              >
                <div className="Actions-Left-CheckPointSummary-Left">
                  <Picto
                    total={currentCheckPoints.length}
                    valid={validCheckPoints.length}
                    litige={file.statut === 10}
                  />
                  <h4
                    style={{ margin: 0 }}
                    className={`item_menu_gauche ${active ? 'left-active' : ''}`}
                    id={`${index}pp`}
                  >
                    {fileFolderDisplayType(file)}
                  </h4>
                </div>
                <p
                  style={{ color: active ? '#16a0e0' : 'black', fontWeight: 500 }}
                  className="Actions-Left-CheckPointSummary-File-Count"
                >
                  {validCheckPoints.length}
                  {'/'}
                  {currentCheckPoints.length}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
};

export default CheckPointsSummary;
