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
import PDFReader from '../../Common/PDFReader';

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

  return <PDFReader idFile={70042} />;
};

export default connect(
  (s: AppState) => ({ loginState: s.views.login }),
  {
    login: loginRequest,
    updateEmail: loginUpdateEmail,
    updatePassword: loginUpdatePassword,
  },
)(Login);
