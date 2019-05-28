/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import PropTypes from 'prop-types';


class ModalTravaux extends Component {
    onCloseModal = () => {
      this.props.onCloseModalType('travaux');
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
            <h1 className="modal_title">TRAVAUX</h1>
            <table className="modal_table" />
          </Modal>
        </div>
      );
    }
}

ModalTravaux.propTypes = {
  open: PropTypes.bool.isRequired,
  onCloseModalType: PropTypes.func.isRequired,
};

export default ModalTravaux;
