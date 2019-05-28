/**
 * Created by stephane.mallaroni on 11/04/2019.
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { API_PATH, WRONG_ID, ERROR_APPEND } from '../variables';
import logo from '../images/sonergia.png';

import Loading from './Loading';

class Connection extends Component {
  state = {
    email: '',
    mdp: '',
    errors: {},
    isLoading: false,
  };

  handleFormSubmit = async (e) => {
    e.preventDefault();
    const { email, mdp } = this.state;

    const validEmail = email && /^.+@.+\..{2,}$/.test(email);
    const validMdp = !!mdp;

    const { errors } = this.state;

    this.setState({
      errors: {
        ...errors,
        email: validEmail ? null : 'Email ne peut pas être vide',
        mdp: validMdp ? null : 'Mot de passe ne peut pas être vide',
      },
    });

    const formIsValid = validEmail && validMdp;

    if (formIsValid) {
      this.setState({ isLoading: true, errors: { formulaire: null } });
      try {
        const response = await fetch(`${API_PATH}login?email=${email}&password=${mdp}`);

        if (response.status < 200 || response.status >= 300) {
          throw new Error(ERROR_APPEND);
        }

        if (response.status >= 200 && response.status < 300) {
          const json = response.json();

          if (json.status !== 'success') throw new Error(WRONG_ID);

          this.setState({
            isLoading: false,
          });

          this.props.history.push('/liste');
        }
      } catch (error) {
        const knowErrors = {
          [ERROR_APPEND]: "Une erreur s'est produite",
          [WRONG_ID]: 'Identifiants inconnus',
          default: "Une erreur s'est produite connexion impossible",
        };

        this.setState({
          errors: {
            ...errors,
            formulaire: knowErrors[error.message] || knowErrors.default,
          },
          isLoading: false,
        });
      }
    }
  };

  render() {
    const {
      isLoading, email, mdp, errors,
    } = this.state;

    return (
      <div className="Connection columns is-mobile is-centered is-vcentered">
        <div className="box is-half has-text-centered">
          <div className="has-text-centered content-loading">
            <div id="loading_connect">
              <Loading show={isLoading} type="Puff" />
            </div>
            <img src={logo} alt="logo sonergia" width="250" />
          </div>
          <div className="has-text-centered">
            <form onSubmit={this.handleFormSubmit}>
              <div className="field">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Votre Email"
                  className="input"
                  value={email}
                  onChange={e => this.setState({ email: e.target.value })}
                  required
                />
                <p style={{ color: 'red' }}>{errors.email}</p>
              </div>
              <div className="field">
                <input
                  type="password"
                  id="mdp"
                  name="mdp"
                  placeholder="Votre Mot de passe"
                  className="input"
                  value={mdp}
                  onChange={e => this.setState({ mdp: e.target.value })}
                  required
                />
                <p style={{ color: 'red' }}>{errors.mdp}</p>
              </div>
              <div className="field">
                <div className="control">
                  <input
                    type="submit"
                    className="button is-primary is-outlined is-fullwidth"
                    value="Connexion"
                  />
                </div>
              </div>
            </form>
            <p style={{ color: 'red' }}>{errors.formulaire}</p>
          </div>
        </div>
      </div>
    );
  }
}

Connection.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Connection);
