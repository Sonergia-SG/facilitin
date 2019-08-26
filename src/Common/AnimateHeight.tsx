import React, {
  useState, useEffect, useRef, ReactNode,
} from 'react';
import ResizeObserver from 'resize-observer-polyfill';

interface Props {
  children: ReactNode;
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

  useEffect(() => {
    const container = ref.current;

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (entry) {
        const { height: h } = entry.contentRect;
        setHeight(h);
      }
    });

    if (container !== null) ro.observe(container);

    return () => {
      if (container !== null) ro.disconnect();
    };
  }, []);

  return (
    <div style={{ height, overflow: 'hidden', transition: 'height .2s ease' }}>
      <div ref={ref}>{children}</div>
    </div>
  );
};

export default AnimatedHeight;
