/**
 * Created by stephane.mallaroni on 15/04/2019.
 */
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';

class DropZone extends Component {
  state = {
    id_file: this.props.id_file,
    files: [],
  };

  onDrop = (acceptedFiles) => {
    // eslint-disable-next-line no-unused-vars, camelcase
    const { id_file } = this.state;

    this.setState({
      files: {
        ...acceptedFiles,
        id_file,
      },
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
        {files.map(f => (
          <div className="notification is-primary notif-file" key={f}>
            {f.name}
          </div>
        ))}
      </div>
    );
  }
}

DropZone.propTypes = {
  id_file: PropTypes.string.isRequired,
};

export default DropZone;
