import { useState, useEffect } from 'react';

import rest from '../../../tools/rest';
import { API_PATH } from '../../../variables';
import { addMessageToQueue } from '../../Alert';
import { SimpleFile, BooleanNumber } from '../../../store/reducer/entities/types';

const useDownloadPreview = (file: SimpleFile) => {
  const [data, updateData] = useState('');
  const downloadFile = async () => {
    try {
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

        updateData(b64);
        // downloadDataUri(b64, fileWithData.filename);
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

  useEffect(() => { downloadFile(); }, []);

  return data;
};

export default useDownloadPreview;
