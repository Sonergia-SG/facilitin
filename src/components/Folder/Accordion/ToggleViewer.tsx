import React from 'react';

interface Props {
  toggle: () => void;
  viewerOpened: boolean;
}

const ToggleViewer = ({ toggle, viewerOpened }: Props) => {
  const icon = viewerOpened ? 'fa-eye-slash' : 'fa-eye';

  return (
    <div style={{ margin: '0 3px' }} key={icon}>
      <div
        onClick={toggle}
        onKeyPress={toggle}
        style={{ cursor: 'pointer' }}
        role="button"
        tabIndex={0}
      >
        <i style={{ fontSize: 24 }} className={`fas ${icon}`} />
      </div>
    </div>
  );
};

export default ToggleViewer;
