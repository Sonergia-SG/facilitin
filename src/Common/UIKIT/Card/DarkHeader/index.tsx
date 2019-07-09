import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

import './DarkHeader.css';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const DarkHeader = ({ children }: Props) => (
  <div className="UIKIT-DarkHeader-background">
    {children}
  </div>
);

export default DarkHeader;
