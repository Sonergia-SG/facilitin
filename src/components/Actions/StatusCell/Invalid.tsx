import React from 'react';

interface Props {
  count: number;
}

const Invalid = ({ count }: Props) => (count > 0 ? (
  <div>
    <i className="fas fa-exclamation-triangle" style={{ color: '#F61616' }} />
    {count}
  </div>
) : null);

export default Invalid;
