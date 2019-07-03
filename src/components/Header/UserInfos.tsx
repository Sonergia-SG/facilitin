import React from 'react';
import { connect } from 'react-redux';

import 'bulma-tooltip/dist/css/bulma-tooltip.min.css';

import { UserInfos as UserType, UserFonction } from '../../store/reducer/user/types';
import { AppState } from '../../store';

import './UserInfos.css';
import captureException from '../../tools/errorReporting/captureException';

interface Props {
  user: UserType | null;
}

const resolveType = (type: UserFonction) => {
  switch (type) {
    case 'instructeur_initial':
      return 'Instructeur initial';
    case 'instructeur_suivi':
      return 'Instructeur de suivi';
    case '':
      return '';
    default:
      captureException(new Error(`Misssing type : ${type}`));
      return '';
  }
};

const UserInfos = ({ user }: Props) => user && (
  <div
    className="Header-UserInfos-Container tooltip is-tooltip-left"
    data-tooltip={resolveType(user.fonction)}
  >
    <p className="Header-UserInfos-Value">
      {user.nom}
      {user.prenom}
    </p>
  </div>
);

export default connect((s: AppState) => ({ user: s.user.user }))(UserInfos);
