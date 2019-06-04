// @flow

/**
 * Created by stephane.mallaroni on 17/04/2019.
 */
import React from 'react';
import Loader from 'react-loader-spinner';

type Props = {
  show?: boolean,
  type?: string,
};

const Loading = ({ show, type }: Props) => {
  if (show) {
    return <Loader type={type} color="#EE6D42" height="110" width="110" />;
  }
  return <span />;
};

Loading.defaultProps = {
  show: false,
  type: 'Puff',
};

export default Loading;
