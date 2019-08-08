import React from 'react';

import './ProgressBar.css';

interface Props {
  values: {
    [index: string]: number;
  };
}

const ProgressBar = ({ values }: Props) => {
  const total = Object.values(values).reduce((t, v) => t + v, 0);

  return (
    <div className="ProgressBar">
      {Object.keys(values).map(k => (
        <div
          key={k}
          className="ProgressBar-Bar"
          style={{ width: `${(values[k] * 100) / total}%`, backgroundColor: k }}
        />
      ))}
    </div>
  );
};

export default ProgressBar;
