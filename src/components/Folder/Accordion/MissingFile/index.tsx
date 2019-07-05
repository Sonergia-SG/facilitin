import React from 'react';

import { SimpleFile } from '../../../../store/reducer/entities/types';
import DropZone from '../../../DropZone';

import './MissingFile.css';

interface Props {
  file: SimpleFile;
  loading: boolean;
  folderId: number;
}

const MissingFile = ({ file, loading, folderId }: Props) => (
  <div className="MissingFile-container">
    <div style={{ width: 190 }} className="notification has-text-centered tilebordered">
      <div className="content">
        <DropZone file={file} idDpOperation={folderId} />
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
        >
          Rejeter
        </button>
        <button
          type="button"
          style={{ transition: 'background-color 0.4s ease' }}
          className={`button is-warning ${
            loading ? ' is-loading' : ''
          }`}
        >
          Incomplet
        </button>
      </div>
    </div>
  </div>
);

export default MissingFile;
