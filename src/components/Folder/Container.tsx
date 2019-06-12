import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

const Container = ({ children }: Props) => (
  <div>
    <div style={{ margin: '0 0 25px' }}>
      <Link to="/actions">{"< Retour à la liste d'opérations"}</Link>
    </div>
    {children}
  </div>
);

export default Container;
