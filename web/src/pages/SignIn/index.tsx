import React, { FormEvent, useState, useEffect } from 'react';
import { FiLock, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';

import Input from '../../components/Input';

import logoImg from '../../assets/images/logo.svg';

import './styles.css';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, handleToggleRemember } = useAuth();

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await localStorage.getItem('@proffy:userRemember');

      if (storagedUser) {
        const User = JSON.parse(storagedUser);

        setEmail(User.email);
        setPassword(User.password);
        handleToggleRemember();
      }
    }

    loadStoragedData();
  }, [handleToggleRemember]);

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();
    signIn(email, password);
  }

  return (
    <div id="page-login">
      <div id="page-login-content">
        <div className="login-logo-container">
          <div className="login-logo">
            <img src={logoImg} alt="Proffy" />
            <h2>Sua plataforma de estudos online.</h2>
          </div>
        </div>
        <div className="login-form">
          <fieldset>
            <form onSubmit={handleSignIn}>
              <header>
                <legend>Fazer Login</legend>
                <Link to="/signup" className="signup-button">
                  <label>Inscrever-se</label>
                </Link>
              </header>
              <div className="input-container">
                <Input
                  icon={FiMail}
                  name="email"
                  label="email"
                  id="email"
                  placeholder="example@seuemail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <Input
                  icon={FiLock}
                  name="password"
                  label="senha"
                  id="password"
                  placeholder="sua senha"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <footer>
                <div>
                  <input
                    onChange={handleToggleRemember}
                    type="checkbox"
                    name="remember"
                  />
                  <label htmlFor="remember">Lembrar</label>
                </div>
                <Link to="/signup" className="signup-button">
                  <label>Esqueceu sua senha?</label>
                </Link>
              </footer>
              <button type="submit">Login</button>
            </form>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
