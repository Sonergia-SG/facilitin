import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ msg }) => (
  <div>
    <p style={{ color: 'red' }}>{msg}</p>
  </div>
);

Error.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default Error;
