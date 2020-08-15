import React, { useCallback, useRef } from 'react';
import { FiLock, FiUser, FiMail } from 'react-icons/fi';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/images/logo.svg';

import { Container, Logo, Title, SubTitle } from './styles';

interface DataProps {
  email: string;
  password: string;
}
const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const handleSignUp = useCallback(async (data: DataProps) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail é obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
    }
    console.log(data);
    /*  signIn(email, password); */
  }, []);

  return (
    <Container>
      <Form onSubmit={handleSignUp} ref={formRef}>
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
        />
        <Input
          icon={FiMail}
          name="email"
          id="email"
          label="E-mail"
          placeholder="example@seuemail.com "
        />
        <Input
          icon={FiLock}
          name="password"
          label="senha"
          placeholder="sua senha"
          type="password"
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
