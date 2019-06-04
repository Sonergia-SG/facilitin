// @flow

import React from 'react';

import ModalMoa from './ModalMoa';
import ModalMoe from './ModalMoe';
import ModalTravaux from './ModalTravaux';

import { type FolderFullDenormalized } from '../../../store/reducer/entities/flowTypes';

type Props = {
  openMoa: boolean,
  openMoe: boolean,
  openSite: boolean,
  onOpenModal: (type: 'moa' | 'moe' | 'travaux') => () => void,
  onCloseModalType: (type: 'moa' | 'moe' | 'travaux') => void,
  data: FolderFullDenormalized,
};

const Modal = ({
  openMoa, openMoe, openSite, onOpenModal, onCloseModalType, data,
}: Props) => (
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
    {data.moa && (
      <ModalMoa open={openMoa} moaValues={data.moa} onCloseModalType={onCloseModalType} />
    )}
    {data.moe && (
      <ModalMoe open={openMoe} moeValues={data.moe} onCloseModalType={onCloseModalType} />
    )}
    {data.travaux && (
      <ModalTravaux
        open={openSite}
        travauxValues={data.travaux}
        onCloseModalType={onCloseModalType}
      />
    )}
  </>
);

export default Modal;
