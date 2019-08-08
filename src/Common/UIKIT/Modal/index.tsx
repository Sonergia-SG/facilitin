import React from 'react';

interface WarningActions {
  type: 'dialog';
  cancel: {
    title: string;
    handle: () => any;
  };
  confirm: {
    title: string;
    handle: () => any;
  };
}

interface Props {
  displayModal: boolean;
  actions: WarningActions;
  title: string;
  message: string;
}

const Modal = ({
  displayModal, actions, title, message,
}: Props) => (
  <div className={`modal ${displayModal ? ' is-active' : ''}`}>
    <div className="modal-background" />
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">{title}</p>
      </header>
      <section className="modal-card-body">{message}</section>
      <footer className="modal-card-foot">
        <button className="button is-success" type="button" onClick={actions.confirm.handle}>
          {actions.confirm.title}
        </button>
        <button className="button" type="button" onClick={actions.cancel.handle}>
          {actions.cancel.title}
        </button>
      </footer>
    </div>
  </div>
);

export default Modal;
