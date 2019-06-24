/**
 * Created by stephane.mallaroni on 17/04/2019.
 */
import React from 'react';
// @ts-ignore
import Loader from 'react-loader-spinner';

interface Props {
  show?: boolean;
  type?: string;
  heigth?: string;
  width?: string;
}

const Loading = ({
  show, type, heigth, width,
}: Props) => {
  if (show) {
    return (
      <Loader
        type={type || 'Puff'}
        color="#EE6D42"
        height={heigth || '110'}
        width={width || '110'}
      />
    );
  }
  return <span />;
};

export default Loading;
