/**
 * Created by stephane.mallaroni on 17/04/2019.
 */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import logo_small from '../images/sonergia_small.png';

class HeaderNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api_key: this.props.api_key === undefined ? false : this.props.api_key,
      from: this.props.from,
      redirection: false,
      redirectionListe: false,
    };
  }

    deconnexionSubmit = (e) => {
      this.setState({ redirection: true });
    };

    retourListe = (e) => {
      this.setState({ redirectionListe: true });
    };

    render() {
      if (this.state.api_key === false) {
        return <Redirect to="/" />;
      } if (this.state.redirection) {
        return <Redirect to="/" />;
      } if (this.state.redirectionListe) {
        return <Redirect to={{ pathname: '/liste', state: { api_key: this.state.api_key } }} />;
      }
      let button_retour;
      if (this.state.from === 'dossier') {
        button_retour = <button className="button is-primary is-outlined" onClick={e => this.retourListe(e)}>Retour liste dossiers</button>;
      } else {
        button_retour = '';
      }
      return (
        <nav className="navbar navbar1" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">

            <img src={logo_small} alt="Logo Sonergia" height="55" />

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
                  {button_retour}
                  <button className="button is-primary" onClick={e => this.deconnexionSubmit(e)}>
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

export default HeaderNav;
