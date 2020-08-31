import React, { useRef, useCallback } from 'react';
import { FiLock, FiMail } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
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
  const history = useHistory();

  const { signIn } = useAuth();
  const { addToast } = useToast();

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
            'Campo "senha" deve ter no mínimo 6 dígitos',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        /*  const getEmail = formRef.current?.getFieldValue('email');

        const getPassword = formRef.current?.getFieldValue('password'); */

        await signIn({
          email: data.email,
          password: data.password,
        });
        history.push('/landing');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: ' Ocorreu um erro ao fazer login, cheque as credenciais',
        });
      }
    },
    [signIn, history, addToast],
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
              <h2>Fazer Logon</h2>
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
                placeholder="Senha"
                type="password"
              />
            </InputContainer>
            <Footer>
              <Link to="/signup" className="signup-button">
                <label>Esqueceu sua senha?</label>
              </Link>
            </Footer>
            <Button type="submit">Entrar</Button>
          </Form>
        </LoginForm>
      </LoginContent>
    </Container>
  );
};

export default SignIn;
