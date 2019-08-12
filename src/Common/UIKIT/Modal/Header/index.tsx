import React from 'react';

interface Props {
  title: string;
}

const Header = ({ title }: Props) => (
  <header className="modal-card-head">
    <p className="modal-card-title">{title}</p>
  </header>
);

export default Header;
