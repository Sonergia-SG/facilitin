import React from 'react';

import './Layout.css';
import Footer from './Common/Footer';

interface Props {
  children: JSX.Element;
}

const Layout = ({ children }: Props) => (
  <div className="Layout-container">
    <div className="Layout-app">{children}</div>
    <Footer />
  </div>
);

export default Layout;
