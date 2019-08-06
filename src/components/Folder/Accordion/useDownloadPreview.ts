import { useState, useEffect, useRef } from 'react';

import rest from '../../../tools/rest';
import { API_PATH } from '../../../variables';
import { addMessageToQueue } from '../../Alert';
import { SimpleFile, BooleanNumber } from '../../../store/reducer/entities/types';

const afterLoading = (l: boolean, toTrigger: () => any) => {
  const lRef = useRef(l);

  useEffect(() => {
    if (lRef.current === true && l === false) {
      toTrigger();
    }

    lRef.current = l;
  }, [l]);
};

const useDownloadPreview = (file: SimpleFile, uploadLoading: boolean) => {
  const [state, updateData] = useState({ data: '', loading: 0 });
  const downloadFile = () => {
    setTimeout(async () => {
      try {
        updateData({ data: state.data, loading: 1 });
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

          updateData({ data: b64, loading: 2 });
          // downloadDataUri(b64, fileWithData.filename);
        } else {
          updateData({ data: state.data, loading: -1 });
          addMessageToQueue({
            duration: 4000,
            type: 'error',
            message: 'Erreur pendant la récupération du fichier',
          });
        }
      } catch (error) {
        console.error(error);
        updateData({ data: state.data, loading: -1 });
        addMessageToQueue({
          duration: 4000,
          type: 'error',
          message: 'Erreur pendant la récupération du fichier',
        });
      }
    }, 500);
  };

  useEffect(() => {
    downloadFile();
  }, []);

  afterLoading(uploadLoading, downloadFile);

  return state;
};

export default useDownloadPreview;
