import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import pdfjs from 'pdfjs-dist';
// @ts-ignore
import throttle from 'lodash.throttle';

import rest from '../../tools/rest';
import { API_PATH } from '../../variables';
import { BooleanNumber } from '../../store/reducer/entities/types';
import { onlyDataArray } from '../../tools/file/downloadDataUri';

import './PDFReader.css';
import Empty from '../../components/Folder/Empty';

pdfjs.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.1.266/pdf.worker.js';

const PDFReader = ({ idFile }: { idFile: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<any>(null);
  const initialViewportRef = useRef<any>(null);
  const pdfRef = useRef<any>(null);
  const [page, setPage] = useState(1);
  const [max, setMax] = useState(1);
  const [scale, setScale] = useState(1);
  const [dlState, setDlState] = useState({ loading: 0 });

  const updateScale = async () => {
    if (containerRef.current && viewportRef.current) {
      const container = containerRef.current;
      const viewport = initialViewportRef.current;
      const fullScale = container.clientWidth / viewport.width;
      setScale(fullScale * 0.97);
    }
  };

  const renderPage = async (pageNumber: number, init?: boolean) => {
    if (canvasRef.current && pdfRef.current && pdfRef.current.numPages >= pageNumber) {
      const canvas = canvasRef.current;
      const pdfPage = await pdfRef.current.getPage(pageNumber);

      viewportRef.current = pdfPage.getViewport({ scale });
      if (init) initialViewportRef.current = viewportRef.current;

      const context = canvas.getContext('2d');

      if (context) {
        canvas.height = viewportRef.current.height;
        canvas.width = viewportRef.current.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewportRef.current,
        };

        context.clearRect(0, 0, canvas.width, canvas.height);
        const renderTask = pdfPage.render(renderContext);

        await renderTask.promise;

        setPage(pageNumber);
        if (init) updateScale();

        canvasRef.current.scrollIntoView();
      }
    }
  };

  useEffect(() => {
    renderPage(page);
  }, [scale]);

  useEffect(() => {
    const handleResize = throttle(
      () => {
        updateScale();
      },
      500,
      { leading: false, trailing: true },
    );
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const dl = async () => {
    try {
      setDlState({ loading: 1 });
      const result = await rest(`${API_PATH}files/${idFile}`);

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
        const data = onlyDataArray(file.file_binary.binarycontent);
        const task = pdfjs.getDocument(data);

        pdfRef.current = await task.promise;
        setDlState({ loading: 2 });

        setMax(pdfRef.current.numPages);

        renderPage(1, true);
      }
    } catch (error) {
      setDlState({ loading: -1 });
    }
  };

  useEffect(() => {
    dl();
  }, []);

  if (dlState.loading === 2) {
    return (
      <div className="PDFReader-container" ref={containerRef}>
        <div className="PDFReader-pdf-container">
          <canvas ref={canvasRef} />
        </div>
        <div>
          <div className="PDFReader-page-control">
            <button type="button" disabled={page === 1} onClick={() => renderPage(page - 1)}>
              <i style={{ marginRight: 3 }} className="fas fa-caret-left fa-2x" />
            </button>
            <p>
              page :
              {' '}
              {page}
              {' '}
  /
              {' '}
              {max}
            </p>
            <button type="button" disabled={max < page + 1} onClick={() => renderPage(page + 1)}>
              <i style={{ marginLeft: 3 }} className="fas fa-caret-right fa-2x" />
            </button>
          </div>
          <div className="PDFReader-zoom-control">
            <button
              type="button"
              style={{ marginBottom: 4 }}
              disabled={scale >= 3}
              onClick={() => setScale(scale + 0.2)}
            >
              <i style={{ marginRight: 0 }} className="fas fa-plus fa-2x" />
            </button>
            <button type="button" disabled={scale <= 0.4} onClick={() => setScale(scale - 0.2)}>
              <i style={{ marginRight: 0 }} className="fas fa-minus fa-2x" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <Empty loading={dlState.loading !== -1} />;
};

export default PDFReader;
