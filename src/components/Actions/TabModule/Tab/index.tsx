import React from 'react';

import './Tab.css';

interface Props {
  children: string;
  index: number;
  selected: number;
  onClick: (index: number) => void;
}

const Tab = ({
  children, index, selected, onClick,
}: Props) => (
  <button
    className={`TabModule-Tab${index === selected ? ' TabModule-Tab-selected' : ''}`}
    onClick={() => onClick(index)}
    type="button"
  >
    {children}
  </button>
);

export default Tab;
