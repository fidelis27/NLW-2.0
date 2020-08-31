import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

import logoImg from '../../assets/images/logo.svg';

import api from '../../services/api';

import { Container, Header, Button, Connections } from './styles';

const ErrorAuth: React.FC = () => {
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get('connections').then((response) => {
      const { total } = response.data;

      setTotalConnections(total);
    });
  }, []);

  return (
    <Container>
      <Header className="login-logo">
        <img src={logoImg} alt="Proffy" />
        <h2>Você precisa estar logado para acessar está página!</h2>
      </Header>

      <Button>
        <Link to="/" className="study">
          Login
        </Link>
      </Button>
      <Connections>
        Total de {totalConnections} conexões já realizadas
        <FaHeart size={20} color="#ac495b" />
      </Connections>
    </Container>
  );
};

export default ErrorAuth;
