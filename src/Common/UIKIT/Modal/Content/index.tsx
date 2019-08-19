import React from 'react';

interface Props {
  message: string;
}

const Content = ({ message }: Props) => <section className="modal-card-body">{message}</section>;

export default Content;
