import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import logoImg from '../../assets/images/logo.svg';

import { Container, Topbar, HeaderContent } from './styles';

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  children,
  description,
}) => {
  return (
    <Container className="page-header">
      <Topbar className="top-bar-container">
        <Link to="/">
          <FaArrowLeft size={24} color="#565656" /> voltar
        </Link>

        <img src={logoImg} alt="Proffy" />
      </Topbar>

      <HeaderContent className="header-content">
        <strong>{title}</strong>
        {description && <p>{description}</p>}
        {children}
      </HeaderContent>
    </Container>
  );
};

export default PageHeader;
