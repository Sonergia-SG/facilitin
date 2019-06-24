import React, { Component } from 'react';

import rest from '../../../tools/rest';
import { API_PATH } from '../../../variables';
import { SimpleFile, BooleanNumber } from '../../../store/reducer/entities/types';
import { addMessageToQueue } from '../../Alert';

interface Props {
  file: SimpleFile;
}

interface State {
  b64: string | undefined;
  name: string | undefined;
}

class DocViewer extends Component<Props, State> {
  state = {
    b64: undefined,
    name: undefined,
  }

  componentDidMount() {
    this.downloadFile();
  }

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
        const b64 = `data:${file.mimetype};base64,${file.file_binary.binarycontent}`;

        this.setState({ b64, name: file.filename });
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
  }

  render() {
    const { b64, name } = this.state;

    return b64 ? (
      <iframe
        title={name}
        src={b64}
        style={{ width: '100%', height: 300 }}
      >
        <p>Your browser does not support iframes.</p>
      </iframe>
    ) : <div>Loading</div>;
  }
}

// ? multiples solutions :
// ?  - Use google doc viewer (need to implement public url)
// ?     + keep care of longer url
// ?  - Use browser viewer can sometimes dowload instead of view
// ?     + diff user experience cross browser
// src={`https://docs.google.com/gview?url=${b64}&embedded=true`}
// src={b64}
// src="http://www.mucem.org/sites/default/files/2018-07/CityPassAvril2018_ficheFR.pdf"
// src="https://docs.google.com/gview?url=https://www.adobe.com/support/ovation/ts/docs/ovation_test_show.ppt&embedded=true"

export default DocViewer;
