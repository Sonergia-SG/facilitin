/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';

import HeaderNav from '../Header';
import Collapsed from './Collapsed';
import Left from './Left';
import Modal from './Modal';
import { fetchFolder } from '../../store/actions/views/folder';

import { folder as folderSchema } from '../../store/reducer/entities/schema';

class Folder extends Component {
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
    const { entities, match } = this.props;
    const { folderId } = match.params;
    const folder = entities.folders[folderId];
    const data = denormalize(folder, folderSchema, entities);

    if (!folder || !data) {
      return <div>loading</div>;
    }

    return (
      <div>
        <HeaderNav from="dossier" />
        <div className="tile is-ancestor">
          <Left data={data} />
          <Collapsed valeur={data.documents} />
        </div>
        <Modal
          openMoa={openMoa}
          openMoe={openMoe}
          openSite={openSite}
          onOpenModal={this.onOpenModal}
          onCloseModalType={this.toggleModal}
          data={data}
        />
      </div>
    );
  }
}

Folder.propTypes = {
  entities: PropTypes.shape({
    folders: PropTypes.shape({}).isRequired,
  }).isRequired,
  folder: PropTypes.shape({
    pending: PropTypes.shape({}).isRequired,
  }).isRequired,
  fetchFolder: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      folderId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect(
  s => ({ entities: s.entities, folder: s.views.folder }),
  { fetchFolder },
)(Folder);
