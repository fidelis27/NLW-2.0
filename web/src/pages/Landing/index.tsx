import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaSignOutAlt } from 'react-icons/fa';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/proffy.jpg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';

import api from '../../services/api';
import {
  LandingContent,
  Header,
  Container,
  Footer,
  LogoContainer,
  UserInfo,
  ButtonsContainer,
} from './styles';
import { useAuth } from '../../contexts/auth';
/*
import './styles.css'; */

const ErrorAuth: React.FC = () => {
  const [totalConnections, setTotalConnections] = useState(0);

  const { signOut, user } = useAuth();

  function handleSignOut() {
    signOut();
  }

  useEffect(() => {
    async function loadConnections(): Promise<void> {
      await api.get('connections').then((res) => {
        const { total } = res.data;
        setTotalConnections(total);
      });
    }
    loadConnections();
  }, []);

  return (
    <Container>
      <Header>
        <UserInfo>
          <img
            src="https://avatars3.githubusercontent.com/u/45233696?s=460&u=3d6e00bcaf41ebc95a6affb75f4a5f1988662df2&v=47"
            alt="profile"
          />
          <span>{user?.email}</span>
        </UserInfo>
        <button type="button" onClick={handleSignOut}>
          Sair
          <FaSignOutAlt size={24} color="#ac495b" title="sair" />
        </button>
      </Header>
      <LandingContent>
        <LogoContainer>
          <img src={logoImg} alt="Proffy" />
          <h2>Sua plataforma de estudos online.</h2>
        </LogoContainer>

        <img src={landingImg} alt="hero" className="hero-image" />
      </LandingContent>
      <Footer>
        <p>
          Seja bem-vindo.
          <strong> O que deseja fazer?</strong>
        </p>
        <span className="total-connections">
          Total de {totalConnections} conexões já realizadas
          <FaHeart size={30} color="#ac495b" />
        </span>
        <ButtonsContainer>
          <Link to="study" className="study">
            <img src={studyIcon} alt="Estudar" />
            Estudar
          </Link>

          <Link to="/give-classes" className="give-classes">
            <img src={giveClassesIcon} alt="Dar aulas" />
            Dar aulas
          </Link>
        </ButtonsContainer>
      </Footer>
    </Container>
  );
};

export default ErrorAuth;
