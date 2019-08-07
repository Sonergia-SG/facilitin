import React from 'react';

import { OperationFull, CheckPoint } from '../../../store/reducer/entities/types';

import fileFolderDisplayType from '../helper/fileFolderDisplayType';
import isRejected from './helpers/checkPointRejected';
import isLitige from './helpers/checkPointInLitige';

import Card from '../../../Common/UIKIT/Card';
import Picto from './Picto';

import './CheckPointSummary.css';
import statusColor from '../Accordion/tools/statusColor';

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
      <Card style={{ flexGrow: 0, padding: 0 }}>
        <div className="content">
          {data.dossierprimefile.map((file, index) => {
            const currentCheckPoints = checkPoints.filter(
              c => c.pivot.id_dp_file === file.id_dp_file,
            );
            const unTraited = currentCheckPoints.filter(c => c.pivot.valide === -1);
            const validCheckPoints = currentCheckPoints.filter(c => c.pivot.valide === 1);
            const litigeCheckPoints = currentCheckPoints.filter(c => isLitige(c));
            const rejectedCheckPoints = currentCheckPoints.filter(c => isRejected(c));

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
                    unTraited={unTraited.length}
                    valid={validCheckPoints.length}
                    litige={litigeCheckPoints.length}
                    rejected={rejectedCheckPoints.length}
                  />
                  <h4
                    className={`item_menu_gauche ${active ? 'left-active' : ''}`}
                    id={`${index}pp`}
                  >
                    {fileFolderDisplayType(file)}
                  </h4>
                </div>
                <p
                  style={{ backgroundColor: statusColor(file) }}
                  className="Actions-Left-CheckPointSummary-File-Count"
                >
                  {validCheckPoints.length}
                  {' / '}
                  {currentCheckPoints.length}
                </p>
              </div>
            );
          })}
        </div>
      </Card>
    );
  }
  return null;
};

export default CheckPointsSummary;
