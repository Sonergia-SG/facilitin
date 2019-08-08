import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Tabs = ({ children }: Props) => <div>{children}</div>;

export default Tabs;
