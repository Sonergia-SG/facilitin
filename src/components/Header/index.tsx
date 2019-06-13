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
      <nav className="navbar navbar1" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <img src={logoSmall} alt="Logo Sonergia" height="55" />
        </div>
        <div className="navbar-end">
          <UserInfos />
          <div className="navbar-item">
            <div className="buttons">
              <button type="button" className="button is-primary" onClick={this.deconnexionSubmit}>
                <strong>Déconnexion</strong>
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default connect(
  null,
  { logout },
)(withRouter(HeaderNav));
