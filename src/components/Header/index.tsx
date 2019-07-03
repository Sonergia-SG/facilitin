/**
 * Created by stephane.mallaroni on 17/04/2019.
 */
import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import logoSmall from '../../images/logo_FACILITIN.png';

import { logout } from '../../store/actions/views/login/index';

import UserInfos from './UserInfos';

interface Props extends RouteComponentProps {
  logout: typeof logout;
}

class HeaderNav extends Component<Props> {
  deconnexionSubmit = () => {
    this.props.logout();
  };

  render() {
    return (
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 30px',
          marginBottom: 0,
        }}
        className="navbar navbar1"
        role="navigation"
        aria-label="main navigation"
      >
        <img src={logoSmall} style={{ height: 60 }} alt="Logo Sonergia" />
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <UserInfos />
          <button type="button" className="button is-small" style={{ width: '100%' }} onClick={this.deconnexionSubmit}>
            <span className="icon is-small">
              <i className="far fa-times-circle" />
            </span>
            <strong>Déconnexion</strong>
          </button>
        </div>
      </nav>
    );
  }
}

export default connect(
  null,
  { logout },
)(withRouter(HeaderNav));
