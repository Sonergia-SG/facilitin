import React from 'react';

import 'bulma-tooltip/dist/css/bulma-tooltip.min.css';

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
  const isValidated = file.statut === 15;
  const disabled = isValidated || isLitige;

  const displayTooltip = disabled ? ' tooltip is-tooltip-left' : '';
  const tooltipMessage = isLitige
    ? 'Le document est déjà rejeté'
    : 'Tous les checkpoints sont validés';

  return (
    <button
      type="button"
      style={{ transition: 'opacity 0.5s ease' }}
      className={`button is-danger${isLitige ? '' : ' is-outlined'} is-pulled-right${
        loading ? ' is-loading' : ''
      }${displayTooltip}`}
      data-tooltip={tooltipMessage}
      id="button-litige"
      disabled={disabled}
      onClick={() => inLitige(folderId, file.id_dp_file)}
    >
      {'Litige'}
    </button>
  );
};

export default Litige;
