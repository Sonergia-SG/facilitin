import React from 'react';
import PropTypes from 'prop-types';

import ModalMoa from './ModalMoa';
import ModalMoe from './ModalMoe';
import ModalTravaux from './ModalTravaux';

import { TypeModal } from '../../Folder';
import { OperationFull } from '../../../store/reducer/entities/types';

interface Props {
  openMoa: boolean;
  openMoe: boolean;
  openSite: boolean;
  onOpenModal: (type: TypeModal) => () => void;
  onCloseModalType: (type: TypeModal) => void;
  data: OperationFull;
}

const Modal = ({
  openMoa,
  openMoe,
  openSite,
  onOpenModal,
  onCloseModalType,
  data,
}: Props) => (
  <>
    <div className="container footersonergia">
      <div className="buttons has-addons is-centered">
        <span
          role="button"
          tabIndex={0}
          className="button is-primary is-outlined is-medium"
          onClick={onOpenModal(TypeModal.MOA)}
          onKeyUp={onOpenModal(TypeModal.MOA)}
        >
          {'MOA'}
        </span>
        <span
          role="button"
          tabIndex={0}
          className="button is-primary is-outlined is-medium"
          onClick={onOpenModal(TypeModal.MOE)}
          onKeyUp={onOpenModal(TypeModal.MOE)}
        >
          {'MOE'}
        </span>
        <span
          role="button"
          tabIndex={0}
          className="button is-primary is-outlined is-medium"
          onClick={onOpenModal(TypeModal.SITE)}
          onKeyUp={onOpenModal(TypeModal.SITE)}
        >
          {'TRAVAUX'}
        </span>
      </div>
    </div>
    {data.dossierprime && (
      <ModalMoa
        open={openMoa}
        folder={data.dossierprime}
        onCloseModalType={onCloseModalType}
      />
    )}
    <ModalMoe open={openMoe} onCloseModalType={onCloseModalType} />
    <ModalTravaux open={openSite} onCloseModalType={onCloseModalType} />
  </>
);

export default Modal;
