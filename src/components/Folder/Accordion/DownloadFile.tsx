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
        const b64 = `data:${file.mimetype};base64,${
          file.file_binary.binarycontent
        }`;

        downloadDataUri(b64, file.filename);
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
}

export default DownloadFile;
