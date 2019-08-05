import React from 'react';
import { HandleThunkActionCreator } from 'react-redux';

import { folderFileEnding } from '../../../../store/actions/views/folder';

import { SimpleFile } from '../../../../store/reducer/entities/types';
import UploadButton from '../UploadButton';

import './MissingFile.css';

interface Props {
  file: SimpleFile;
  loading: boolean;
  folderId: number;
  fileEnding: HandleThunkActionCreator<typeof folderFileEnding>;
}

const MissingFile = ({
  file,
  loading,
  folderId,
  fileEnding,
}: Props) => (
  <div className="MissingFile-container">
    <div style={{ width: 190 }} className="notification has-text-centered tilebordered">
      <div className="content">
        <UploadButton file={file} idDpOperation={folderId} />
      </div>
    </div>
    <div className="MissingFile-infos">
      <h1 className="MissingFile-title">Pas de fichier disponible.</h1>
      <div className="MissingFile-buttons">
        <button
          type="button"
          style={{ transition: 'background-color 0.4s ease' }}
          className={`button is-danger ${
            loading ? ' is-loading' : ''
          }`}
          onClick={() => {
            if (file.id_file !== null) fileEnding(folderId, file.id_dp_file, file.id_file, 10);
          }}
        >
          Rejeter
        </button>
        <button
          type="button"
          style={{ transition: 'background-color 0.4s ease' }}
          className={`button is-warning ${
            loading ? ' is-loading' : ''
          }`}
          onClick={() => {
            if (file.id_file !== null) fileEnding(folderId, file.id_dp_file, file.id_file, 5);
          }}
        >
          Incomplet
        </button>
      </div>
    </div>
  </div>
);

export default MissingFile;
