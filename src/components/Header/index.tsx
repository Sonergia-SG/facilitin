/**
 * Created by stephane.mallaroni on 17/04/2019.
 */
import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import logoSmall from '../../images/sonergia_small.png';

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
        <img src={logoSmall} alt="Logo Sonergia" height="55" />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <UserInfos />
          <button type="button" className="button is-primary" onClick={this.deconnexionSubmit}>
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
