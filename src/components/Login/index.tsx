/**
 * Created by stephane.mallaroni on 11/04/2019.
 */
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import logo from '../../images/sonergia_small.png';

import './Login.css';

import {
  loginRequest,
  loginUpdateEmail,
  loginUpdatePassword,
} from '../../store/actions/views/login';
import { LoginState } from '../../store/reducer/views/login/types';
import { AppState } from '../../store/index';

interface Props {
  login: any;
  updateEmail: typeof loginUpdateEmail;
  updatePassword: typeof loginUpdatePassword;
  loginState: LoginState;
}

const Login = ({
  loginState, updateEmail, updatePassword, login,
}: Props) => {
  const emailRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  return (
    <div className="Login-container">
      <div className="Login-header">
        <img src={logo} alt="Sonergia logo" />
      </div>
      <div className="Login-content">
        <div className="Login-panel">
          <div className="Login-info">
            <h1>Bienvenue dans votre espace</h1>
            <p>SONERGIA</p>
            <h4>Entrez vos identifiants pour être orienté vers votre outils dédié</h4>
          </div>
          <form
            className="Login-form"
            onSubmit={async (e) => {
              e.preventDefault();
              login();
            }}
          >
            <div className="field">
              <p className="control has-icons-left">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="login"
                  className="input Login-form-input"
                  value={loginState.email}
                  onChange={e => updateEmail(e.target.value)}
                  ref={emailRef}
                  required
                />
                <span className="icon is-small is-left">
                  <i className="far fa-user" />
                </span>
              </p>
              {loginState.errors.email && <p style={{ color: 'red' }}>{loginState.errors.email}</p>}
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  type="password"
                  id="mdp"
                  name="mdp"
                  placeholder="mot de passe"
                  className="input Login-form-input"
                  value={loginState.password}
                  onChange={e => updatePassword(e.target.value)}
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock" />
                </span>
              </p>
              {loginState.errors.password && (
                <p style={{ color: 'red' }}>{loginState.errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className={`button Login-form-button${
                loginState.loading ? ' is-loading' : ''
              }`}
            >
              Connexion
            </button>
          </form>
          {loginState.errors.formulaire && (
            <p style={{ color: 'red' }}>{loginState.errors.formulaire}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default connect(
  (s: AppState) => ({ loginState: s.views.login }),
  {
    login: loginRequest,
    updateEmail: loginUpdateEmail,
    updatePassword: loginUpdatePassword,
  },
)(Login);
