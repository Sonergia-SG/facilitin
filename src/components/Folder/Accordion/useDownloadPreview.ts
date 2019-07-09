import { useState, useEffect } from 'react';

import rest from '../../../tools/rest';
import { API_PATH } from '../../../variables';
import { addMessageToQueue } from '../../Alert';
import { SimpleFile, BooleanNumber } from '../../../store/reducer/entities/types';

const useDownloadPreview = (file: SimpleFile) => {
  const [state, updateData] = useState({ data: '', loading: false });
  const downloadFile = async () => {
    try {
      updateData({ data: state.data, loading: true });
      const result = await rest(`${API_PATH}files/${file.id_file}`);

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

        const fileWithData = json.file[0];
        const b64 = `data:${fileWithData.mimetype};base64,${
          fileWithData.file_binary.binarycontent
        }`;

        updateData({ data: b64, loading: false });
        // downloadDataUri(b64, fileWithData.filename);
      } else {
        updateData({ data: state.data, loading: false });
        addMessageToQueue({
          duration: 4000,
          type: 'error',
          message: 'Erreur pendant la récupération du fichier',
        });
      }
    } catch (error) {
      console.error(error);
      updateData({ data: state.data, loading: false });
      addMessageToQueue({
        duration: 4000,
        type: 'error',
        message: 'Erreur pendant la récupération du fichier',
      });
    }
  };

  useEffect(() => { downloadFile(); }, []);

  return state;
};

export default useDownloadPreview;
