import React, { lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import idx from 'idx';

import { SimpleFile } from '../../../store/reducer/entities/types';

import { AppState } from '../../../store';
import Loading from '../../Loading';

const PDFReader = lazy(() => import('../../../Common/PDFReader'));

interface ConnectProps {
  file: SimpleFile;
}

interface Props extends ConnectProps {
  uploadLoading: boolean | undefined;
}

const Preview = ({ file, uploadLoading }: Props) => (
  <div style={{ width: '100%', height: '100%' }}>
    {file.id_file !== null && uploadLoading === false && (
      <Suspense fallback={<Loading />}>
        <PDFReader idFile={file.id_file} />
      </Suspense>
    )}
  </div>
);
export default connect((s: AppState, p: ConnectProps) => {
  if (p.file.id_file === null) return { loading: false };

  const { pending } = s.views.folder;
  const fileId = p.file.id_dp_file;
  return {
    uploadLoading: idx(pending, _ => _[p.file.id_dp_operation].file[fileId].loading) || false,
  };
})(Preview);
