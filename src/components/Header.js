/**
 * Created by stephane.mallaroni on 17/04/2019.
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import logoSmall from '../images/sonergia_small.png';

class HeaderNav extends Component {
  state = {
    from: this.props.from,
  };

  deconnexionSubmit = () => {
    this.props.history.push('/');
  };

  retourListe = () => {
    this.props.history.push('/liste');
  };

  render() {
    const { from } = this.state;
    const buttonRetour = from === 'dossier' ? (
      <button type="button" className="button is-primary is-outlined" onClick={this.retourListe}>Retour liste dossiers</button>
    ) : null;

    return (
      <nav className="navbar navbar1" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <img src={logoSmall} alt="Logo Sonergia" height="55" />
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {buttonRetour}
                <button type="button" className="button is-primary" onClick={this.deconnexionSubmit}>
                  <strong>Déconnexion</strong>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

HeaderNav.propTypes = {
  from: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(HeaderNav);
