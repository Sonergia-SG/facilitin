import React from 'react';

interface Props {
  msg: string,
};

const Error = ({ msg }: Props) => (
  <div>
    <p style={{ color: '#F61616' }}>{msg}</p>
  </div>
);

export default Error;