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
  data, ending, pending, locked,
}: Props) => {
  const displayButton = data.dossierprimefile
    ? data.dossierprimefile.some(f => f.statut === 10)
      || data.dossierprimefile.every(f => f.statut === 15 || f.statut === 10)
    : false;

  if (displayButton) {
    const handleClick = () => ending(data.id_dp_operation);

    const loading = pending ? pending.endingLoading : false;
    const inProgress = data.statut ? data.statut.code_statut === 0 : true;

    return (
      <div className="tile is-child">
        <div className="content has-text-centered">
          <button
            onClick={handleClick}
            type="button"
            disabled={!inProgress || locked}
            style={{ transition: 'opacity .2s ease' }}
            className={`button is-primary${loading ? ' is-loading' : ''} is-outlined is-medium`}
          >
            {'Terminer'}
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
