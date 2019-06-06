/**
 * Created by stephane.mallaroni on 17/04/2019.
 */
import React from 'react';
// @ts-ignore
import Loader from 'react-loader-spinner';

interface Props {
  show?: boolean;
  type?: string;
}

const Loading = ({ show, type }: Props) => {
  if (show) {
    return <Loader type={type || 'Puff'} color="#EE6D42" height="110" width="110" />;
  }
  return <span />;
};

export default Loading;
