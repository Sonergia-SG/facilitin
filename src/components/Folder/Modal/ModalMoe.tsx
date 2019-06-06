/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

import { TypeModal } from '../../Folder'

interface Props {
  open: boolean,
  onCloseModalType: (type: TypeModal.MOE) => void,
}

class ModalMoe extends Component<Props> {
    onCloseModal = () => {
      this.props.onCloseModalType(TypeModal.MOE);
    };

    render() {
      return (
        <div>
          <Modal
            open={this.props.open}
            onClose={this.onCloseModal}
            center
            styles={{ modal: { border: '2px #00D1B2 solid' } }}
          >
            <h1 className="modal_title">MOE</h1>
            <table className="modal_table" />
          </Modal>
        </div>
      );
    }
}

export default ModalMoe;
