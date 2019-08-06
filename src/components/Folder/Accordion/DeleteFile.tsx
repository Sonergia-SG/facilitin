import React from 'react';
import { connect, HandleThunkActionCreator } from 'react-redux';

import { deleteFile } from '../../../store/actions/views/folder/deleteFile';
import { SimpleFile } from '../../../store/reducer/entities/types';

interface Props {
  file: SimpleFile;
  deleteF: HandleThunkActionCreator<typeof deleteFile>;
}

const DeleteFile = ({ file, deleteF }: Props) => {
  const disabled = file.id_file === null && file.id_file === 0;

  const protectedDelete = () => {
    if (file.id_file !== null && file.id_file > 0) {
      deleteF(file.id_file, file.id_dp_operation);
    }
  };

  return (
    <div style={{ width: 20, margin: '0 3px', opacity: disabled ? 0.6 : 1 }}>
      <div
        onClick={protectedDelete}
        onKeyPress={protectedDelete}
        style={{ cursor: 'pointer' }}
        role="button"
        tabIndex={0}
      >
        <i style={{ fontSize: 24 }} className="fas fa-trash" />
      </div>
    </div>
  );
};

export default connect(null, { deleteF: deleteFile })(DeleteFile);
