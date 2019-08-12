import React, { useEffect, useRef } from 'react';
// @ts-ignore
import pdfjs from 'pdfjs-dist';
// @ts-ignore
import pdfWorker from 'pdfjs-dist/build/pdf.worker';
import rest from '../../tools/rest';
import { API_PATH } from '../../variables';
import { BooleanNumber } from '../../store/reducer/entities/types';
import { onlyDataArray } from '../../tools/file/downloadDataUri';

const url = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf';

// pdf.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
pdfjs.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.1.266/pdf.worker.js';
// pdf.GlobalWorkerOptions.workerSrc = pdfWorker;

const PDFReader = ({ idFile }: { idFile: number }) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const dl = async () => {
    if (idFile === 70042) {
      /* const result = await rest(`${API_PATH}files/${idFile}`);

      if (result.status === 200) {
        interface JSON {
          status: 'success' | 'fail';
          file: {
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
          };
        }
        const json: JSON = await result.json();

        const { file } = json;
        console.log(idFile);
        // console.log(file.file_binary);

        const data = onlyDataArray(file.file_binary.binarycontent);

        console.log(pdf.getDocument); */
      const task = pdfjs.getDocument(url);

      const pdf = await task.promise;

      const page = await pdf.getPage(1);
      console.log(page);
      console.log(canvas);
    }
  };
  useEffect(() => {
    dl();
  }, []);

  return (
    <div>
      <canvas
        ref={canvas}
      />
    </div>
  );
};

export default PDFReader;
