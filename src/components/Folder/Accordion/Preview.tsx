import React from 'react';

import { SimpleFile } from '../../../store/reducer/entities/types';

import useDownloadPreview from './useDownloadPreview';

interface Props {
  file: SimpleFile;
}

const Preview = ({ file }: Props) => {
  const data = useDownloadPreview(file);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {data !== '' && (
        <iframe
          title="Fakedocument.pdf"
          src={data}
          style={{ width: '100%', height: '100%' }}
        >
          <p>Your browser does not support iframes.</p>
        </iframe>
      )}
    </div>
  );
};

export default Preview;
