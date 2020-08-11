import React, { useState, FormEvent } from 'react';
import { FiLock, FiUser, FiMail } from 'react-icons/fi';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/images/logo.svg';

import { Container, Form, Logo, Title, SubTitle } from './styles';

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSingUp(e: FormEvent) {
    e.preventDefault();
    console.log(name, email);
  }

  return (
    <Container>
      <Form onSubmit={handleSingUp}>
        <Link to="/">
          <FaArrowLeft size={24} color="#565656" />
        </Link>
        <Title>Cadastro</Title>
        <SubTitle>Preencha os dados abaixo para começar.</SubTitle>

        <Input
          icon={FiUser}
          name="name"
          id="name"
          label="nome"
          placeholder="seu nome"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Input
          icon={FiMail}
          name="email"
          id="email"
          label="E-mail"
          placeholder="example@seuemail.com "
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          icon={FiLock}
          name="password"
          label="senha"
          placeholder="sua senha"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button type="submit">Concluir cadastro</Button>
      </Form>
      <Logo>
        <img src={logoImg} alt="Proffy" />
        <h2>Sua plataforma de estudos online.</h2>
      </Logo>
    </Container>
  );
};

export default SignUp;
