import React from 'react';

interface Props {
  count: number;
  total: number;
}

const Invalid = ({ count, total }: Props) => (total ? (
  <div>
    <i className="fas fa-check-circle" style={{ color: '#2BA048', marginRight: 3 }} />
    {`${count}/${total}`}
  </div>
) : null);

export default Invalid;
