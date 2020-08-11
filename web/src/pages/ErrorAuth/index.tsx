import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

import logoImg from '../../assets/images/logo.svg';

import api from '../../services/api';

import './styles.css';

const ErrorAuth: React.FC = () => {
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get('connections').then((response) => {
      const { total } = response.data;

      setTotalConnections(total);
    });
  }, []);

  return (
    <div id="page-login-landing">
      <div id="page-login-landing-content" className="container">
        <div className="login-logo">
          <img src={logoImg} alt="Proffy" />
          <h2>Você precisa estar logado para acessar está página!</h2>
        </div>

        <div className="login-buttons-container">
          <Link to="/" className="study">
            Login
          </Link>
        </div>
        <span className="login-total-connections">
          Total de {totalConnections} conexões já realizadas
          <FaHeart size={20} color="#ac495b" />
        </span>
      </div>
    </div>
  );
};

export default ErrorAuth;
