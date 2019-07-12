import React from 'react';

import Loading from '../../Loading';
import Error from '../../Error';

interface Props {
  loading: boolean;
  msg?: string;
}

const Empty = ({ loading, msg }: Props) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      height: 'calc(100% - 80px)',
    }}
  >
    {loading
      ? <Loading show />
      : <Error msg={msg || 'Une erreur est survenue pendant le chargement du dossier'} />
    }
  </div>
);

export default Empty;
