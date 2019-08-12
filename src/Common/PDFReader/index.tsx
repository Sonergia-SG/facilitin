import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import pdfjs from 'pdfjs-dist';
// @ts-ignore
import pdfWorker from 'pdfjs-dist/build/pdf.worker';
import rest from '../../tools/rest';
import { API_PATH } from '../../variables';
import { BooleanNumber } from '../../store/reducer/entities/types';
import { onlyDataArray } from '../../tools/file/downloadDataUri';
import idx from 'idx';

// const url =
//  'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf';
const url = 'VALENSOLE_CM.pdf';

// pdf.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
pdfjs.GlobalWorkerOptions.workerSrc =
  '//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.1.266/pdf.worker.js';
// pdf.GlobalWorkerOptions.workerSrc = pdfWorker;

const PDFReader = ({ idFile }: { idFile: number }) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const pdfRef = useRef<any>(null);
  const [page, setPage] = useState(1);
  const [max, setMax] = useState(1);
  const [scale, setScale] = useState(1);

  const renderPage = async (pageNumber: number) => {
    if (
      canvas.current &&
      pdfRef.current &&
      pdfRef.current.numPages >= pageNumber
    ) {
      const page = await pdfRef.current.getPage(pageNumber);

      const viewport = page.getViewport({ scale });

      const context = canvas.current.getContext('2d');

      if (context) {
        canvas.current.height = viewport.height;
        canvas.current.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport,
        };

        context.clearRect(0, 0, canvas.current.width, canvas.current.height);
        const renderTask = page.render(renderContext);

        await renderTask.promise;

        setPage(pageNumber);
      }
    }
  };

  useEffect(() => {
    renderPage(page);
  }, [scale]);

  const dl = async () => {
    if (idFile === 70042 && canvas.current) {
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

      pdfRef.current = await task.promise;

      setMax(pdfRef.current.numPages);

      renderPage(1);
    }
  };

  useEffect(() => {
    dl();
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
      }}
    >
      <canvas ref={canvas} />
      <button disabled={page === 1} onClick={() => renderPage(page - 1)}>
        Prev
      </button>
      <button disabled={max < page + 1} onClick={() => renderPage(page + 1)}>
        Next
      </button>
      <p>
        page : {page} / {max}
      </p>
      <button disabled={scale <= 0.2} onClick={() => setScale(scale - 0.2)}>
        -
      </button>
      <button disabled={scale >= 3} onClick={() => setScale(scale + 0.2)}>
        +
      </button>
    </div>
  );
};

export default PDFReader;
