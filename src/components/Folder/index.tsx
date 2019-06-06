/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';

// import { API_PATH } from '../variables';
import Collapsed from './Collapsed';
import Modal from './Modal';
import Empty from './Empty';
import { fetchFolder } from '../../store/actions/views/folder';

import { folder as folderSchema } from '../../store/reducer/entities/schema';
import { Entities, FolderFull } from '../../store/reducer/entities/types';
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
  state = {
    open_moa: false,
    open_moe: false,
    open_travaux: false,
  };

  componentWillMount() {
    this.props.fetchFolder(parseInt(this.props.match.params.folderId, 0));
  }

  onOpenModal = (type: TypeModal) => () => {
    if (type === 'moa') {
      this.setState({ open_moa: true });
    } else if (type === 'moe') {
      this.setState({ open_moe: true });
    } else {
      this.setState({ open_travaux: true });
    }
  };

  onCloseModalType = (type: TypeModal) => {
    if (type === 'moa') {
      this.setState({ open_moa: false });
    } else if (type === 'moe') {
      this.setState({ open_moe: false });
    } else {
      this.setState({ open_travaux: false });
    }
  };

  render() {
    /* eslint-disable camelcase */
    const { open_moa, open_moe, open_travaux } = this.state;
    const { entities, match, folderState } = this.props;
    const { folderId } = match.params;
    const folder = entities.folders[parseInt(folderId, 10)];
    const data: FolderFull = denormalize(folder, folderSchema, entities);
    const title = `Dossier N° ${data.id_dossierprime}`;

    if (!folder || !data || !data.documents) {
      const folderPending = folderState.pending[parseInt(folderId, 10)];
      const loading = folderPending ? !!folderPending.loading : true;
      return <Empty loading={loading} />;
    }

    return data ? (
      <div>
        <div className="tile is-ancestor">
          <div className="tile is-vertical is-3">
            <div className="tile">
              <div className="tile is-parent is-vertical">
                <div className="tile is-child notification has-text-centered">
                  <p className="title">{title}</p>
                  <p className="subtitle">{data.code_operation}</p>
                  <div className="content" />
                </div>
                <div className="tile is-child notification ">
                  <div className="content">
                    {data.documents.map((value, index) => (
                      <h4
                        className={`item_menu_gauche ${index === 0 ? 'left-active' : ''}`}
                        key={value.id_file}
                        id={`${index}pp`}
                      >
                        {value.type}
                      </h4>
                    ))}
                  </div>
                </div>
                <div className="tile is-child">
                  <div className="content has-text-centered">
                    <button type="button" className="button is-primary is-outlined is-medium">
                      {'Terminer'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tile is-parent">
            <div className="tile is-child">
              <div className="content">
                <div className="content">
                  <Collapsed valeur={data.documents} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          openMoa={open_moa}
          openMoe={open_moe}
          openSite={open_travaux}
          onOpenModal={this.onOpenModal}
          onCloseModalType={this.onCloseModalType}
          data={data}
        />
      </div>
    ) : (
      <div>Loading</div>
    );
  }
}

export default connect(
  (s: AppState) => ({ entities: s.entities, folderState: s.views.folder }),
  { fetchFolder },
)(Folder);
