/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React, { Component } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';

import Collapsed from './Collapsed';
import Empty from './Empty';
import Left from './Left';
import { fetchFolder } from '../../store/actions/views/folder';

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
  fetchFolder: any;
}

export enum TypeModal {
  MOA = 'moa',
  MOE = 'moe',
  SITE = 'travaux',
}

class Folder extends Component<Props> {
  componentWillMount() {
    this.props.fetchFolder(parseInt(this.props.match.params.folderId, 0));
  }

  render() {
    const { entities, match, folderState } = this.props;
    const { folderId } = match.params;
    const operation = entities.operations[parseInt(folderId, 10)];
    const data: OperationFull = denormalize(
      operation,
      operationSchema,
      entities
    );

    const folderPending = folderState.pending[parseInt(folderId, 10)];
    const loading = folderPending ? !!folderPending.loading : true;
    if (!operation || !data || !data.dossierprimefile) {
      return <Empty loading={loading} />;
    }

    const title = `Dossier N° ${data.id_dossierprime}`;

    return (
      <div>
        <div style={{ margin: '0 0 25px' }}>
          <Link to="/liste">{"< Retour à la liste d'opérations"}</Link>
        </div>
        <div className="tile is-ancestor">
          <Left title={title} data={data} />
          <div className="tile is-parent">
            <div className="tile is-child" style={{ marginTop: 0 }}>
              <Collapsed valeur={data.dossierprimefile} loading={loading} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (s: AppState) => ({ entities: s.entities, folderState: s.views.folder }),
  { fetchFolder }
)(Folder);
