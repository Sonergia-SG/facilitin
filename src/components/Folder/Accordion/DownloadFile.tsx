import React, { Component } from 'react'
import rest from '../../../tools/rest';
import { API_PATH } from '../../../variables';
import { addMessageToQueue } from '../../Alert';
import { BooleanNumber, FilesActions, SimpleFile } from '../../../store/reducer/entities/types';

import downloadDataUri from '../../../tools/file/downloadDataUri'

interface Props {
  file: SimpleFile;
}

interface State {
  loading: boolean
}

class DownloadFile extends Component<Props, State> {
  state: Readonly<State> = {
    loading: false
  }

  downloadFile = async () => {
    this.setState({ loading: true })
    
    try {
      const result = await rest(`${API_PATH}files/${this.props.file.id_file}`)
      
      if (result.status === 200) {
        type JSON = {
          status: 'success' | 'fail',
          file: Array<{
            id_file: number,
            datecreation: string,
            id_user: number,
            shorturl: string | null,
            filename: string,
            mimetype: string,
            exported: BooleanNumber,
            no_content: BooleanNumber,
            deleted: BooleanNumber,
            file_binary:{
              id_file: number,
              binarycontent: string
            }
          }>
        }
        const json: JSON = await result.json()

        const file = json.file[0]
        const b64 = `data:${file.mimetype};base64,${file.file_binary.binarycontent}`

        downloadDataUri(b64, file.filename);
      } else {
        addMessageToQueue({
          duration: 4000,
          type: "error",
          message: 'Erreur pendant la récupération du fichier',
        })
      }
      this.setState({ loading: false })
    } catch (error) {
      console.error(error)
      this.setState({ loading: false })
      addMessageToQueue({
        duration: 4000,
        type: "error",
        message: 'Erreur pendant la récupération du fichier',
      })
    }
  }

  render() {
    const { file } = this.props
    return (
      <div style={{ width: 190, marginTop: 5 }} className="notification tilebordered">
        <div onClick={this.downloadFile} className="content has-text-centered bigplus">
          <i className="fas fa-file-download fa-2x" />
        </div>
      </div>
    )
  }
}

export default DownloadFile
