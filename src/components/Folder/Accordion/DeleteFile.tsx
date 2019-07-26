import React, { Component } from 'react';
import rest from '../../../tools/rest';
import { API_PATH } from '../../../variables';
import { addMessageToQueue } from '../../Alert';
import {
  BooleanNumber,
  SimpleFile,
} from '../../../store/reducer/entities/types';

import downloadDataUri from '../../../tools/file/downloadDataUri';

interface Props {
  file: SimpleFile;
}




class DeleteFile extends Component<Props> {
  delete = async () => {
    try {

      if(confirm('Êtes-vous sûr de vouloir supprimer ?')){
        const result = await rest(`${API_PATH}files/${this.props.file.id_file}`, {method: 'DELETE'});
        if ( result.status === 200) {
          window.location.reload();
        } else {
          addMessageToQueue({
            duration: 4000,
            type: 'error',
            message: 'Erreur pendant la suppression du fichier',
          });
        }
      }
    } catch (error) {
      console.error(error);
      addMessageToQueue({
        duration: 4000,
        type: 'error',
        message: 'Erreur pendant la suppression du fichier',
      });
    }
  };

  render() {
      return (
        <div style={{ width: 20, margin: '0 3px' }}>
          <div
            onClick={this.delete}
            onKeyPress={this.delete}
            style={{ cursor: 'pointer' }}
            role="button"
            tabIndex={0}
          >
            <i style={{ fontSize: 24 }} className="fas fa-trash" />
          </div>
        </div>
      );
  }
}

export default DeleteFile;
