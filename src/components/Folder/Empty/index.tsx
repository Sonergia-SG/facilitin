import React from 'react';

import Loading from '../../Loading';
import Error from '../../Error';

interface Props {
  loading: boolean;
}

const Empty = ({ loading }: Props) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'calc(100% - 80px)',
    }}
  >
    {loading
      ? <Loading show />
      : <Error msg="Une erreur est survenue pendant le chargement du dosiser" />
    }
  </div>
);

export default Empty;
