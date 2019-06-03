import React from 'react';
import PropTypes from 'prop-types';

import Loading from '../../Loading';
import Error from '../../Error';

const Empty = ({ loading }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'calc(100% - 120px)',
    }}
  >
    {loading
      ? <Loading show />
      : <Error msg="Une erreur est survenue pendant le chargement du dosiser" />
    }
  </div>
);

Empty.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Empty;
