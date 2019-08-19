import React from 'react';

import Footer, { Actions } from './Footer';
import Header from './Header';
import Content from './Content';

interface Props {
  displayModal: boolean;
  actions: Actions;
  title: string;
  message: string;
}

const Modal = ({
  displayModal, actions, title, message,
}: Props) => (
  <div className={`modal ${displayModal ? ' is-active' : ''}`}>
    <div className="modal-background" />
    <div className="modal-card">
      <Header title={title} />
      <Content message={message} />
      <Footer actions={actions} />
    </div>
  </div>
);

export default Modal;
