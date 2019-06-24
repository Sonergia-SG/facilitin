/**
 * Created by stephane.mallaroni on 11/04/2019.
 */
import React, { Component } from 'react';
import { RouteChildrenProps } from 'react-router';
import { connect } from 'react-redux';

import logo from '../images/sonergia.png';

import Loading from './Loading';

import { loginRequest, loginUpdateEmail, loginUpdatePassword } from '../store/actions/views/login';
import { LoginState } from '../store/reducer/views/login/types';
import { AppState } from '../store/index';

interface Props {
  login: any;
  updateEmail: typeof loginUpdateEmail;
  updatePassword: typeof loginUpdatePassword;
  loginState: LoginState;
}

class Connection extends Component<Props & RouteChildrenProps> {
  componentDidMount = () => {
    setTimeout(() => {
      if (this.emailRef) {
        this.emailRef.focus();
      }
    }, 100);
  };

  emailRef: HTMLInputElement | undefined;

  render() {
    const {
      loginState, updateEmail, updatePassword, login,
    } = this.props;
    return (
      <div className="Connection columns is-mobile is-centered is-vcentered">
        <div className="box is-half has-text-centered">
          <div className="has-text-centered content-loading">
            <div id="loading_connect">
              <Loading show={loginState.loading} type="Puff" />
            </div>
            <img src={logo} alt="logo sonergia" width="250" height="250" />
          </div>
          <div className="has-text-centered">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                login();
              }}
            >
              <div className="field">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Votre Email"
                  className="input"
                  value={loginState.email}
                  onChange={e => updateEmail(e.target.value)}
                  ref={(ref: HTMLInputElement) => {
                    this.emailRef = ref;
                  }}
                  required
                />
                {loginState.errors.email && (
                  <p style={{ color: 'red' }}>{loginState.errors.email}</p>
                )}
              </div>
              <div className="field">
                <input
                  type="password"
                  id="mdp"
                  name="mdp"
                  placeholder="Votre Mot de passe"
                  className="input"
                  value={loginState.password}
                  onChange={e => updatePassword(e.target.value)}
                  required
                />
                {loginState.errors.password && (
                  <p style={{ color: 'red' }}>{loginState.errors.password}</p>
                )}
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
            {loginState.errors.formulaire && (
              <p style={{ color: 'red' }}>{loginState.errors.formulaire}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (s: AppState) => ({ loginState: s.views.login }),
  {
    login: loginRequest,
    updateEmail: loginUpdateEmail,
    updatePassword: loginUpdatePassword,
  },
)(Connection);
