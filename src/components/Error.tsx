import React from 'react';

interface Props {
  msg: string,
};

const Error = ({ msg }: Props) => (
  <div>
    <p style={{ color: 'red' }}>{msg}</p>
  </div>
);

export default Error;