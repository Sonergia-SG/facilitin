import React, { ReactNode, useState } from 'react';
import { useTransition, animated } from 'react-spring';

import './Section.css';

import AnimateHeight from '../AnimateHeight';

interface Props {
  children: ReactNode;
  title: string;
  style: any;
}

const Section = ({ children, title, style }: Props) => {
  const [opened, setOpened] = useState(false);

  const transitions = useTransition(opened, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

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
      {transitions.map(({ item, key, props }) => (
        item && (
          <animated.div
            key={key}
            style={{ marginLeft: 15, ...props, ...style }}
          >
            <AnimateHeight>
              {children}
            </AnimateHeight>
          </animated.div>
        )
      ))}
    </div>
  );
};

export default Section;
