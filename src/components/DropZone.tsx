/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import idx from 'idx';

import { File as SonergiaFile } from '../store/reducer/entities/types';

import { uploadFile } from '../store/actions/views/folder/index';
import { AppState } from '../store';

import Loading from './Loading';

interface ConnectProps {
  file: SonergiaFile;
  idDpOperation: number;
}

interface Props extends ConnectProps {
  upload: any;
  loading: boolean;
}

interface State {
  file: File | undefined;
}

class DropZone extends Component<Props, State> {
  state: Readonly<State> = {
    file: undefined,
  };

  reader = new FileReader();

  input: HTMLInputElement | undefined = undefined;

  /* componentDidMount() {
    if (this.input && this.reader) {
      this.reader.addEventListener('load', () => {
        console.log(this.reader.result);
      });

      this.reader.readAsDataURL(this.input);
    }
  } */

  onDrop = (acceptedFiles: Array<File>) => {
    const reader = new FileReader();
    const file = acceptedFiles[0];

    const { upload, idDpOperation, file: originalFile } = this.props;

    const handleLoad = () => {
      if (typeof reader.result === 'string') {
        this.setState({
          file,
        });

        upload(idDpOperation, originalFile.id_file, file, reader.result);
      }

      reader.removeEventListener('load', handleLoad);
    };

    reader.addEventListener('load', handleLoad);

    reader.readAsDataURL(file);
  };

  render() {
    const maxSize = 5242880;
    const { file } = this.state;
    const { loading } = this.props;

    return (
      <div className="text-center mt-5">
        {loading ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 3px',
            }}
          >
            <Loading show heigth="20" width="20" />
          </div>
        ) : (
          <Dropzone
            onDrop={this.onDrop}
            accept="application/pdf, application/msword, application/vnd.oasis.opendocument.text"
            minSize={0}
            maxSize={maxSize}
            multiple={false}
          >
            {({
              getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles,
            }) => {
              const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
              return (
                <div {...getRootProps()}>
                  <input
                    ref={(ref: HTMLInputElement) => {
                      this.input = ref;
                    }}
                    {...getInputProps()}
                  />
                  <i
                    style={{ fontSize: 24, cursor: 'pointer', margin: '0 3px' }}
                    className="fas fa-file-upload"
                  />
                  {/* {isDragActive && !isDragReject ? 'Déposez votre fichier ici !' : ''}
                  {isDragReject && 'Type de fichier non accepté !'}
                  {isFileTooLarge && (
                    <div className="text-danger mt-2">
                      Le fichier est trop volumineux (5Mb Max).
                    </div>
                  )} */}
                </div>
              );
            }}
          </Dropzone>
        )}
        {file && <div className="notification is-primary notif-file">{file.name}</div>}
      </div>
    );
  }
}

export default connect(
  (s: AppState, p: ConnectProps) => ({
    loading:
      idx(s, _ => _.views.folder.pending[p.idDpOperation].file[p.file.id_file].loading) || false,
  }),
  { upload: uploadFile },
)(DropZone);
