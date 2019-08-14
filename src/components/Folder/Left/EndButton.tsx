import React from 'react';
import { connect } from 'react-redux';

import { folderEnding } from '../../../store/actions/views/folder';

import { OperationFull } from '../../../store/reducer/entities/types';
import { FolderPendingItem } from '../../../store/reducer/views/folder/types';

interface Props {
  data: OperationFull;
  pending: FolderPendingItem | undefined;
  ending: any;
  locked: boolean;
}

export const EndButtonComponent = ({
  data,
  ending,
  pending,
  locked,
}: Props) => {
  const displayButton = data.dossierprimefile
    ? data.dossierprimefile.some(f => f.statut === 10)
      || data.dossierprimefile.every(f => f.statut === 15 || f.statut === 5)
    : false;

  if (displayButton) {
    const handleClick = () => ending(data.id_dp_operation);

    const loading = pending ? pending.endingLoading : false;
    const inProgress = data.statut ? data.statut.code_statut === 0 : true;

    const docStatus = () => {
      if (data.dossierprimefile !== undefined) {
        if (data.dossierprimefile.some(f => f.statut === 10)) {
          return {
            title: 'Passer en rejet',
            class: ' is-danger',
          };
        }

        if (data.dossierprimefile.some(f => f.statut === 5)) {
          return {
            title: 'Passer en incomplet',
            class: ' is-warning',
          };
        }

        if (data.dossierprimefile.every(f => f.statut === 15)) {
          return {
            title: 'Passer en valider',
            class: ' is-success',
          };
        }
      }

      return {
        title: "En cours d'instruction",
        class: '',
      };
    };

    const status = docStatus();

    return (
      <div className="tile is-child">
        <div className="content has-text-centered">
          <button
            onClick={handleClick}
            type="button"
            disabled={!inProgress || locked}
            style={{ transition: 'opacity .2s ease', width: '98%' }}
            className={`button${status.class}${
              loading ? ' is-loading' : ''
            } is-medium`}
          >
            {status.title}
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default connect(
  null,
  { ending: folderEnding },
)(EndButtonComponent);
