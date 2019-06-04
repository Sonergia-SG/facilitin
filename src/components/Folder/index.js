// @flow

/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';

import Collapsed from './Collapsed';
import Left from './Left';
import Modal from './Modal';
import Empty from './Empty';

import { fetchFolder } from '../../store/actions/views/folder';

import { folder as folderSchema } from '../../store/reducer/entities/schema';
import { type State as ReduxState } from '../../store/reducer';
import { type Entities, type FolderFullDenormalized } from '../../store/reducer/entities/flowTypes';
import { type OneFolderState } from '../../store/reducer/views/folder';

type Props = {
  entities: Entities,
  folderState?: OneFolderState,
  fetchFolder: typeof fetchFolder,
  match: {
    params: {
      folderId: string,
    },
  },
};

type State = {
  openMoa: boolean,
  openMoe: boolean,
  openSite: boolean,
};

class Folder extends Component<Props, State> {
  static defaultProps = {
    folderState: {
      loading: true,
    },
  };

  state = {
    openMoa: false,
    openMoe: false,
    openSite: false,
  };

  componentWillMount() {
    this.props.fetchFolder(this.props.match.params.folderId);
  }

  toggleModal = (type) => {
    switch (type) {
      case 'moa': {
        const open = this.state.openMoa;
        this.setState({ openMoa: !open });
        break;
      }
      case 'moe': {
        const open = this.state.openMoe;
        this.setState({ openMoe: !open });
        break;
      }
      default: {
        const open = this.state.openSite;
        this.setState({ openSite: !open });
        break;
      }
    }
  };

  onOpenModal = type => () => this.toggleModal(type);

  render() {
    const { openMoa, openMoe, openSite } = this.state;
    const { entities, match, folderState } = this.props;
    const { folderId } = match.params;
    const folder = entities.folders[folderId];
    const data: FolderFullDenormalized = denormalize(folder, folderSchema, entities);

    if (!folder || !data) {
      const loading = folderState ? folderState.loading : true;
      return <Empty loading={loading} />;
    }

    return (
      <>
        <div className="tile is-ancestor">
          <Left data={data} />
          {data.documents && <Collapsed valeur={data.documents} />}
        </div>
        <Modal
          openMoa={openMoa}
          openMoe={openMoe}
          openSite={openSite}
          onOpenModal={this.onOpenModal}
          onCloseModalType={this.toggleModal}
          data={data}
        />
      </>
    );
  }
}

export default connect(
  (s: ReduxState, p: Props) => ({
    entities: s.entities,
    folderState: s.views.folder.pending[p.match.params.folderId],
  }),
  { fetchFolder },
)(Folder);
