import React from 'react';

interface Props {
  total: number;
  valid: number;
  unTraited: number;
  litige: number;
  rejected: number;
}

const resolveIco = (
  total: number,
  valid: number,
  litige: number,
  rejected: number,
  untraited: number,
) => {
  if (rejected > 0) {
    return {
      key: 'error',
      name: 'fa-exclamation-triangle',
      color: '#FF6C60',
    };
  }

  if (litige > 0) {
    return {
      key: 'warning',
      name: 'fa-exclamation-triangle',
      color: '#FCB322',
    };
  }

  if (untraited > 0) {
    return {
      key: 'untraited',
      name: 'fa-circle',
      color: '#444',
    };
  }

  if (valid === total) {
    return {
      key: 'ok',
      name: 'fa-check-circle',
      color: '#A9D86E',
    };
  }

  return {
    key: 'untraited',
    name: 'fa-circle',
    color: '#444',
  };
};

const Picto = ({
  litige, total, valid, rejected, unTraited,
}: Props) => {
  const icoConfig = resolveIco(total, valid, litige, rejected, unTraited);

  return (
    <div key={icoConfig.key}>
      <i className={`fas ${icoConfig.name}`} style={{ color: icoConfig.color }} />
    </div>
  );
};

export default Picto;
