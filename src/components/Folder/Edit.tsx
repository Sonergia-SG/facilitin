/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';

import Collapsed from './Collapsed';
import Empty from './Empty';
import Left from './Left';

import { operation as operationSchema } from '../../store/reducer/entities/schema';
import { Entities, OperationFull } from '../../store/reducer/entities/types';
import { FolderState } from '../../store/reducer/views/folder/types';
import { AppState } from '../../store';

interface Params {
  folderId: string;
}

interface Props extends RouteComponentProps<Params> {
  entities: Entities;
  folderState: FolderState;
  selectedAccordion: number | undefined;
  handleAccordionClick: (index: number) => () => void;
}

const Edit = ({
  entities, match, folderState, selectedAccordion, handleAccordionClick,
}: Props) => {
  const folderId = parseInt(match.params.folderId, 10);
  const operation = entities.operations[folderId];
  const data: OperationFull = denormalize(operation, operationSchema, entities);

  const folderPending = folderState.pending[folderId];
  const loading = folderPending ? !!folderPending.loading : true;
  if (!operation || !data || !data.dossierprimefile) {
    return <Empty loading={loading} />;
  }

  const title = `Dossier N° ${data.id_dossierprime}`;

  return (
    <div className="tile is-ancestor">
      <Left
        selectedAccordion={selectedAccordion}
        handleAccordionClick={handleAccordionClick}
        loading={loading}
        title={title}
        data={data}
      />
      <div className="tile is-parent">
        <div className="tile is-child" style={{ marginTop: 0 }}>
          <Collapsed
            files={data.dossierprimefile}
            checkPoints={data.point_controles}
            selectedAccordion={selectedAccordion}
            handleAccordionClick={handleAccordionClick}
            loading={loading}
            folderId={folderId}
            pending={folderPending}
          />
        </div>
      </div>
    </div>
  );
};

export default connect((s: AppState) => ({ entities: s.entities, folderState: s.views.folder }))(
  withRouter(Edit),
);
