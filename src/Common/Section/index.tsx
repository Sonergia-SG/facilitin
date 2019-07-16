import React, { ReactNode, useState } from 'react';

import './Section.css';

interface Props {
  children: ReactNode;
  title: string;
  style: any;
}

const Section = ({ children, title, style }: Props) => {
  const [opened, setOpened] = useState(false);

  return (
    <div className="Section-container">
      <div
        className="Section-header"
        role="button"
        tabIndex={0}
        onClick={() => setOpened(!opened)}
        onKeyPress={() => setOpened(!opened)}
      >
        <h3>{title}</h3>
        <div
          style={{ transform: `rotate(${opened ? '-180deg' : '0deg'})` }}
          className="Section-header-chevron"
        >
          <i className="fas fa-chevron-down" />
        </div>
      </div>
      {opened && <div style={{ marginLeft: 15, ...style }}>{children}</div>}
    </div>
  );
};

export default Section;
