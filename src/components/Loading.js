/**
 * Created by stephane.mallaroni on 17/04/2019.
 */
import React from 'react';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';

const Loading = ({ show, type }) => {
  if (show) {
    return (
      <Loader
        type={type}
        color="#EE6D42"
        height="110"
        width="110"
      />
    );
  }
  return (<span />);
};

Loading.propTypes = {
  show: PropTypes.bool,
  type: PropTypes.string,
};

Loading.defaultProps = {
  show: false,
  type: 'Puff',
};

export default Loading;
