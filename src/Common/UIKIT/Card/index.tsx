import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import './Card.css';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
}

const Card = ({
  children, style, className, ...p
}: Props) => (
  <div
    style={style}
    className={`UIKIT-Card-container${className ? ` ${className}` : ''}`}
    {...p}
  >
    {children}
  </div>
);

export default Card;
