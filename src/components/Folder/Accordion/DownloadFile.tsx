import React, { Component } from 'react';
import rest from '../../../tools/rest';
import { API_PATH } from '../../../variables';
import { addMessageToQueue } from '../../Alert';
import { BooleanNumber, SimpleFile } from '../../../store/reducer/entities/types';

import downloadDataUri from '../../../tools/file/downloadDataUri';

interface Props {
  file: SimpleFile;
}

class DownloadFile extends Component<Props> {
  downloadFile = async () => {
    try {
      const result = await rest(`${API_PATH}files/${this.props.file.id_file}`);

      if (result.status === 200) {
        interface JSON {
          status: 'success' | 'fail';
          file: Array<{
            id_file: number;
            datecreation: string;
            id_user: number;
            shorturl: string | null;
            filename: string;
            mimetype: string;
            exported: BooleanNumber;
            no_content: BooleanNumber;
            deleted: BooleanNumber;
            file_binary: {
              id_file: number;
              binarycontent: string;
            };
          }>;
        }
        const json: JSON = await result.json();

        const file = json.file[0];

        downloadDataUri(file.file_binary.binarycontent, file.filename, file.mimetype);
      } else {
        addMessageToQueue({
          duration: 4000,
          type: 'error',
          message: 'Erreur pendant la récupération du fichier',
        });
      }
    } catch (error) {
      console.error(error);
      addMessageToQueue({
        duration: 4000,
        type: 'error',
        message: 'Erreur pendant la récupération du fichier',
      });
    }
  };

  render() {
    const { file } = this.props;

    if (file.id_file !== null && file.id_file > 0) {
      return (
        <div style={{ width: 20, margin: '0 3px' }}>
          <div
            onClick={this.downloadFile}
            onKeyPress={this.downloadFile}
            style={{ cursor: 'pointer' }}
            role="button"
            tabIndex={0}
          >
            <i style={{ fontSize: 24 }} className="fas fa-file-download" />
          </div>
        </div>
      );
    }

    return (
      <div style={{ width: 20, margin: '0 3px', opacity: 0.6 }}>
        <div>
          <i style={{ fontSize: 24 }} className="fas fa-file-download" />
        </div>
      </div>
    );
  }
}

export default DownloadFile;
