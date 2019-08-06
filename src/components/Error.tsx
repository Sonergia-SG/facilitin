import React from 'react';

interface Props {
  msg: string;
}

const Error = ({ msg }: Props) => (
  <div>
    <p style={{ color: '#FF6C60' }}>{msg}</p>
  </div>
);

export default Error;
