/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React, { Component } from 'react';
import Dropzone, { DropEvent } from 'react-dropzone';

interface FileType extends File {
  name: string;
  path: string;
  lastModified: number,
  size: number,
  type: string;
}

interface State {
  files: Array<File>;
}

class DropZone extends Component<{}, State> {
  state = {
    files: [],
  };

  onDrop = (acceptedFiles: File[]) => {
    this.setState({
      files: acceptedFiles,
    });
  };

  render() {
    const maxSize = 5242880;
    const { files } = this.state;

    return (
      <div className="text-center mt-5">
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
                <input {...getInputProps()} />
                <span className="bigplus">
                  <i className="fas fa-file-upload fa-2x" />
                </span>
                <br />
                {isDragActive && !isDragReject ? 'Déposez votre fichier ici !' : ''}
                {isDragReject && 'Type de fichier non accepté !'}
                {isFileTooLarge && (
                  <div className="text-danger mt-2">Le fichier est trop volumineux (5Mb Max).</div>
                )}
              </div>
            );
          }}
        </Dropzone>
        {files.map((f: File) => (
          <div className="notification is-primary notif-file" key={f.lastModified}>
            {f.name}
          </div>
        ))}
      </div>
    );
  }
}

export default DropZone;
