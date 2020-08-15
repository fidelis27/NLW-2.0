import React, { useRef, useEffect, useCallback } from 'react';
import { FiLock, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { useAuth } from '../../contexts/auth';
import getValidationErrors from '../../utils/getValidationErrors';

import Button from '../../components/Button';

import Input from '../../components/Input';
import {
  Container,
  Header,
  LogoContainer,
  LoginContent,
  LoginForm,
  InputContainer,
  Footer,
} from './styles';
import logoImg from '../../assets/images/logo.svg';

interface DataProps {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn, handleToggleRemember } = useAuth();

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await localStorage.getItem('@proffy:userRemember');

      if (storagedUser) {
        const User = JSON.parse(storagedUser);

        formRef.current?.setFieldValue('email', User.email);
        formRef.current?.setFieldValue('password', User.password);
        handleToggleRemember();
      }
    }

    loadStoragedData();
  }, [handleToggleRemember]);

  const handleSignIn = useCallback(
    async (data: DataProps) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Campo "E-mail" é obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(
            6,
            'Campo e-mail deve ter no mínimo 6 dígitos',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        const getEmail = formRef.current?.getFieldValue('email');

        const getPassword = formRef.current?.getFieldValue('password');

        signIn(getEmail, getPassword);
      } catch (err) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    },
    [signIn],
  );

  return (
    <Container>
      <LoginContent>
        <LogoContainer>
          <img src={logoImg} alt="Proffy" />
          <h2>Sua plataforma de estudos online.</h2>
        </LogoContainer>

        <LoginForm>
          <Form onSubmit={handleSignIn} ref={formRef}>
            <Header>
              <h2>Fazer Login</h2>
              <Link to="/signup" className="signup-button">
                <label>Inscrever-se</label>
              </Link>
            </Header>
            <InputContainer>
              <Input
                icon={FiMail}
                name="email"
                label="E-mail"
                id="email"
                placeholder="example@seuemail.com"
              />
              <Input
                icon={FiLock}
                name="password"
                label="Senha"
                id="password"
                placeholder="sua senha"
                type="password"
              />
            </InputContainer>
            <Footer>
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
            </Footer>
            <Button type="submit">Login</Button>
          </Form>
        </LoginForm>
      </LoginContent>
    </Container>
  );
};

export default SignIn;
