/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React, { useRef, ReactNode, useState } from 'react';
import { connect } from 'react-redux';
import idx from 'idx';

import { File as SonergiaFile } from '../../../../store/reducer/entities/types';

import { uploadFile } from '../../../../store/actions/views/folder/index';
import { AppState } from '../../../../store';

import Drop from './Drop';
import './DropZone.css';

interface ConnectProps {
  file: SonergiaFile;
  idDpOperation: number;
}

interface Props extends ConnectProps {
  upload: any;
  loading: boolean;
  children: ReactNode;
}

const DropZone = ({
  loading, file: dpFile, upload, idDpOperation, children,
}: Props) => {
  const input = useRef<HTMLInputElement>(null);

  const dragCounter = useRef(0);
  const [displayDrop, setDisplayDrop] = useState(false);
  const incrementDragCount = () => {
    dragCounter.current += 1;
    if (dragCounter.current > 0) {
      setDisplayDrop(true);
    }
    console.log('incrementDragCount', dragCounter.current);
  };
  const decrementDragCount = () => {
    dragCounter.current -= 1;
    if (dragCounter.current <= 0) {
      setDisplayDrop(false);
    }
    console.log('decrementDragCount', dragCounter.current);
  };

  const handleDrop = (acceptedFiles: Array<File>) => {
    const file = acceptedFiles[0];

    if (file) {
      const reader = new FileReader();

      const handleLoad = () => {
        if (typeof reader.result === 'string') {
          dragCounter.current = 0;
          setDisplayDrop(false);
          upload(idDpOperation, dpFile.id_file, file, reader.result);
        }

        reader.removeEventListener('load', handleLoad);
      };

      reader.addEventListener('load', handleLoad);

      reader.readAsDataURL(file);
    }
  };

  const maxSize = 5242880;

  const disabled = !(dpFile.statut === -1 || dpFile.statut === 0 || dpFile.statut === 5);

  return (
    <div
      className="DropZone-container"
      onDragEnter={incrementDragCount}
      onDragLeave={decrementDragCount}
    >
      {children}
      {displayDrop && !disabled && (
        <Drop
          loading={loading}
          onDrop={handleDrop}
          maxSize={maxSize}
          disabled={disabled}
          incrementDragCount={incrementDragCount}
          decrementDragCount={decrementDragCount}
          inputRef={input}
        />
      )}
    </div>
  );
};

export default connect(
  (s: AppState, p: ConnectProps) => {
    if (p.file.id_file === null) return { loading: false };

    const { pending } = s.views.folder;
    const fileId = p.file.id_file;
    return {
      loading: idx(pending, _ => _[p.idDpOperation].file[fileId].loading) || false,
    };
  },
  { upload: uploadFile },
)(DropZone);
