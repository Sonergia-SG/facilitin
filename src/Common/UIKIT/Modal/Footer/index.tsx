import React from 'react';

import resolveColorByType from './resolveColorByType';

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

interface ConfirmActions {
  type: 'confirm';
  cancel: {
    title: string;
    handle: () => any;
  };
  confirm: {
    title: string;
    handle: () => any;
  };
}

interface AlertActions {
  type: 'alert';
  confirm: {
    title: string;
    handle: () => any;
  };
}

export type Actions = WarningActions | ConfirmActions | AlertActions;

interface Props {
  actions: Actions;
}

const Footer = ({ actions }: Props) => (
  <footer className="modal-card-foot" style={{ display: 'flex', flexDirection: 'row-reverse' }}>
    <button
      className={`button ${resolveColorByType(actions.type)}`}
      type="button"
      style={{ marginLeft: 8 }}
      onClick={actions.confirm.handle}
    >
      {actions.confirm.title}
    </button>
    {actions.type !== 'alert' && (
      <button className="button" type="button" onClick={actions.cancel.handle}>
        {actions.cancel.title}
      </button>
    )}
  </footer>
);

export default Footer;
