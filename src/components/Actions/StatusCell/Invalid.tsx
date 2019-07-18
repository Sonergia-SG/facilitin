import React from 'react';

interface Props {
  count: number;
}

const Invalid = ({ count }: Props) => (count > 0 ? (
  <div style={{ marginRight: 5 }}>
    <i className="fas fa-exclamation-triangle" style={{ color: '#F61616', marginRight: 3 }} />
    {count}
  </div>
) : null);

export default Invalid;
