import React, { useState } from 'react';
import { connect, HandleThunkActionCreator } from 'react-redux';

import { deleteFile } from '../../../store/actions/views/folder/deleteFile';
import { SimpleFile } from '../../../store/reducer/entities/types';
import Modal from '../../../Common/UIKIT/Modal';

interface Props {
  file: SimpleFile;
  deleteF: HandleThunkActionCreator<typeof deleteFile>;
}

const DeleteFile = ({ file, deleteF }: Props) => {
  const disabled = file.id_file === null && file.id_file === 0;

  const [displayModal, setDpModal] = useState(false);

  const protectedDelete = () => {
    if (file.id_file !== null && file.id_file > 0) {
      deleteF(file.id_file, file.id_dp_operation);
    }
  };

  return (
    <div style={{ width: 20, margin: '0 3px', opacity: disabled ? 0.6 : 1 }}>
      <div
        onClick={() => setDpModal(true)}
        onKeyPress={() => setDpModal(true)}
        style={{ cursor: 'pointer' }}
        role="button"
        tabIndex={0}
      >
        <i style={{ fontSize: 24 }} className="fas fa-trash" />
      </div>
      <Modal
        displayModal={displayModal}
        title="Suppression du fichier"
        message="Supprimer un fichier est irréversible, souhaitez-vous poursuivre ?"
        actions={{
          type: 'alert',
          cancel: {
            handle: () => {
              setDpModal(false);
            },
            title: 'Annuler',
          },
          confirm: {
            handle: () => {
              setDpModal(false);
              protectedDelete();
            },
            title: 'Supprimer le fichier',
          },
        }}
      />
    </div>
  );
};

export default connect(
  null,
  { deleteF: deleteFile },
)(DeleteFile);
