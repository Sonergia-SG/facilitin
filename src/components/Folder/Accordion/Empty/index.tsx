import React from 'react';

import Loading from '../../../Loading';
import Error from '../../../Error';

interface Props {
  loading: boolean;
  msg?: string;
}

const Empty = ({ loading, msg }: Props) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    }}
  >
    {loading
      ? <Loading show />
      : <Error msg={msg || 'Une erreur est survenue pendant le chargement du fichier'} />
    }
  </div>
);

export default Empty;
