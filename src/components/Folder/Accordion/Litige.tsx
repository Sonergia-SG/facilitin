import React from 'react';

interface Props {
  file: { statut: number; id_dp_file: number };
  folderId: number;
  inLitige: any;
  loading: boolean;
}

const Litige = ({
  file, inLitige, folderId, loading,
}: Props) => {
  const isLitige = file.statut === 10;

  return (
    <button
      type="button"
      style={{ transition: 'opacity 0.5s ease' }}
      className={`button is-danger${isLitige ? '' : ' is-outlined'} is-pulled-right${
        loading ? ' is-loading' : ''
      }`}
      id="button-litige"
      disabled={file.statut === 15 || isLitige}
      onClick={() => inLitige(folderId, file.id_dp_file)}
    >
      {'Litige'}
    </button>
  );
};

export default Litige;
