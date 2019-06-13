import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import './Container.css';

interface Props {
  children: ReactNode;
  toggleComments: () => void;
}

const Container = ({ children, toggleComments }: Props) => (
  <div>
    <div className="Folder-Header">
      <Link to="/actions">{"< Retour à la liste d'opérations"}</Link>
      <a className="Folder-Header-Button-Icon" onClick={toggleComments}>
        <div className="Folder-Header-NotigBadge" />
        <i style={{ color: 'black' }} className="fas fa-envelope fa-2x" />
      </a>
    </div>
    {children}
  </div>
);

export default Container;
