/**
 * Created by stephane.mallaroni on 11/04/2019.
 */
// @flow

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import logo from '../images/sonergia.png';

import Loading from './Loading';

import { type State } from '../store/reducer';
import { type LoginState } from '../store/reducer/views/login';

import { loginRequest, loginUpdateEmail, loginUpdatePassword } from '../store/actions/views/login';

type Props = {
  login: typeof loginRequest,
  updateEmail: typeof loginUpdateEmail,
  updatePassword: typeof loginUpdatePassword,
  loginState: LoginState,
  history: {
    push: (path: string) => void,
  },
};

class Connection extends Component<Props, null> {
  componentDidMount = () => {
    setTimeout(() => {
      if (this.emailRef) {
        this.emailRef.focus();
      }
    }, 100);
  };

  handleMailChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.props.updateEmail(e.target.value);
  };

  handlePasswordChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.props.updatePassword(e.target.value);
  };

  emailRef: ?HTMLInputElement;

  render() {
    const { loginState, login } = this.props;
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
              onSubmit={async (e: Event) => {
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
                  onChange={this.handleMailChange}
                  ref={(ref) => {
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
                  onChange={this.handlePasswordChange}
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
            {loginState.errors.form && <p style={{ color: 'red' }}>{loginState.errors.form}</p>}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (s: State) => ({ loginState: s.views.login }),
  {
    login: loginRequest,
    updateEmail: loginUpdateEmail,
    updatePassword: loginUpdatePassword,
  },
)(withRouter(Connection));
