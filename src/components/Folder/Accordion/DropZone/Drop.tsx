import React, { RefObject } from 'react';
import Dropzone from 'react-dropzone';

import Loading from '../../../Loading';

interface Props {
  loading: boolean;
  onDrop: (acceptedFiles: Array<File>) => void;
  maxSize: number;
  disabled: boolean;
  inputRef: RefObject<HTMLInputElement> | null;
  incrementDragCount: () => void;
  decrementDragCount: () => void;
}

const Drop = ({
  loading,
  onDrop,
  maxSize,
  disabled,
  inputRef,
  incrementDragCount,
  decrementDragCount,
}: Props) => (
  <div
    onDragEnter={incrementDragCount}
    onDragLeave={decrementDragCount}
    className="text-center mt-5"
  >
    {loading ? (
      <div
        className="DropZone-overlay"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 3px',
        }}
      >
        <Loading show heigth="50" width="50" />
      </div>
    ) : (
      <Dropzone
        onDrop={onDrop}
        accept="application/pdf, application/msword, application/vnd.oasis.opendocument.text"
        minSize={0}
        maxSize={maxSize}
        multiple={false}
        disabled={disabled}
      >
        {({
          getRootProps,
          getInputProps,
          isDragActive,
          isDragReject,
          rejectedFiles,
        }) => {
          const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

          const rootProps = getRootProps();

          return (
            <div
              {...rootProps}
              className={`${rootProps.className} DropZone-overlay`}
            >
              <input ref={inputRef} {...getInputProps()} />
              <div className="DropZone-upload-icon">
                <i
                  onDragEnter={incrementDragCount}
                  onDragLeave={decrementDragCount}
                  style={{
                    opacity: disabled ? 0.6 : 1,
                  }}
                  className="fas fa-file-upload"
                />
              </div>
              <p>Déposer vos fichier pour les transférer</p>
            </div>
          );
        }}
      </Dropzone>
    )}
  </div>
);

export default Drop;
