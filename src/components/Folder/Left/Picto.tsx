import React from 'react';

interface Props {
  total: number;
  valid: number;
  litige?: boolean;
}

const resolveIco = (total: number, valid: number, litige?: boolean) => {
  if (litige) {
    return {
      key: 'error',
      name: 'fa-exclamation-triangle',
      color: '#F61616',
    };
  }

  if (valid === total) {
    return {
      key: 'ok',
      name: 'fa-check-circle',
      color: '#2BA048',
    };
  }

  return {
    key: 'warning',
    name: 'fa-exclamation-triangle',
    color: '#FBD44A',
  };
};

const Picto = ({ litige, total, valid }: Props) => {
  const icoConfig = resolveIco(total, valid, litige);

  return (
    <div key={icoConfig.key}>
      <i className={`fas ${icoConfig.name}`} style={{ color: icoConfig.color }} />
    </div>
  );
};

export default Picto;
