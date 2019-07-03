import React, { useState, useEffect, useRef } from 'react';

interface Props {
  children: JSX.Element;
}

const AnimatedHeight = ({ children }: Props) => {
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (container !== null) {
      if (height !== (container as HTMLElement).scrollHeight) {
        setHeight((container as HTMLElement).scrollHeight);
      }
    }
  });

  return (
    <div style={{ height, overflow: 'hidden', transition: 'height .2s ease' }}>
      <div ref={ref}>{children}</div>
    </div>
  );
};

export default AnimatedHeight;
