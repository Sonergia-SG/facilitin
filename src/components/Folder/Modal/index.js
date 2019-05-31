import React from 'react';
import PropTypes from 'prop-types';

import ModalMoa from './ModalMoa';
import ModalMoe from './ModalMoe';
import ModalTravaux from './ModalTravaux';

const Modal = ({
  openMoa, openMoe, openSite, onOpenModal, onCloseModalType, data,
}) => (
  <>
    <div className="container footersonergia">
      <div className="buttons has-addons is-centered">
        <span
          role="button"
          tabIndex={0}
          className="button is-primary is-outlined is-medium"
          onClick={onOpenModal('moa')}
          onKeyUp={onOpenModal('moa')}
        >
          {'MOA'}
        </span>
        <span
          role="button"
          tabIndex={0}
          className="button is-primary is-outlined is-medium"
          onClick={onOpenModal('moe')}
          onKeyUp={onOpenModal('moe')}
        >
          {'MOE'}
        </span>
        <span
          role="button"
          tabIndex={0}
          className="button is-primary is-outlined is-medium"
          onClick={onOpenModal('travaux')}
          onKeyUp={onOpenModal('travaux')}
        >
          {'TRAVAUX'}
        </span>
      </div>
    </div>
    <ModalMoa open={openMoa} moaValues={data.moa} onCloseModalType={onCloseModalType} />
    <ModalMoe open={openMoe} moeValues={data.moe} onCloseModalType={onCloseModalType} />
    <ModalTravaux
      open={openSite}
      travauxValues={data.travaux}
      onCloseModalType={onCloseModalType}
    />
  </>
);

Modal.propTypes = {
  openMoa: PropTypes.bool.isRequired,
  openMoe: PropTypes.bool.isRequired,
  openSite: PropTypes.bool.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  onCloseModalType: PropTypes.func.isRequired,
  data: PropTypes.shape({
    moa: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    moe: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    travaux: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
};

export default Modal;
