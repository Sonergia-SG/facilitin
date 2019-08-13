import React from 'react';
import { connect } from 'react-redux';
import idx from 'idx';

import { SimpleFile } from '../../../store/reducer/entities/types';

import useDownloadPreview from './useDownloadPreview';
import Empty from './Empty';
import { AppState } from '../../../store';
import PDFReader from '../../../Common/PDFReader';

interface ConnectProps {
  file: SimpleFile;
}

interface Props extends ConnectProps {
  uploadLoading: boolean | undefined;
}

// const { data, loading } = useDownloadPreview(file, !!uploadLoading);
// if (loading === 0) return null;
const Preview = ({ file, uploadLoading }: Props) => (
  <div style={{ width: '100%', height: '100%' }}>
    {/* {data !== '' ? ( */}
    {/* {file.id_file ? ( */}
    <PDFReader idFile={70042} />
    {/* ) : ( */}
    {/* <Empty loading={loading === 1} /> */}
    {/* )} */}
  </div>
);
export default connect((s: AppState, p: ConnectProps) => {
  if (p.file.id_file === null) return { loading: false };

  const { pending } = s.views.folder;
  const fileId = p.file.id_file;
  return {
    uploadLoading:
      idx(pending, _ => _[p.file.id_dp_operation].file[fileId].loading)
      || false,
  };
})(Preview);
