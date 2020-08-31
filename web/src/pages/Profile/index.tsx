import React, { useCallback, useRef, ChangeEvent } from 'react';
import { FiLock, FiUser, FiMail, FiCamera } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import { Container, Title, AvatarInput } from './styles';

interface DataProps {
  name: string;
  email: string;
  password: string;
  oldPassword: string;
  confirmPassword: string;
}

const Profile: React.FC = () => {
  const history = useHistory();
  const { addToast } = useToast();
  const { user, updateUser } = useAuth();

  const formRef = useRef<FormHandles>(null);

  const handleProfile = useCallback(
    async (data: DataProps) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
          oldPassword: Yup.string().min(6, 'No mínimo 6 dígitos'),
          confirmPassword: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, email, oldPassword, password, confirmPassword } = data;

        const formData = {
          name,
          email,
          ...(oldPassword
            ? {
                oldPassword,
                password,
                confirmPassword,
              }
            : {}),
        };

        const response = await api.put('/accounts', formData);
        const { avatar } = response.data;
        if (response.data) {
          updateUser({ name, email, password: oldPassword, avatar });
        }

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description:
            'Suas informações do perfil foram atualizadas com sucesso!',
        });
        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description:
            'Ocorreu um erro ao atualizar o perfil, tente novamente!',
        });
      }
    },
    [addToast, history, updateUser],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();
        data.append('name', 'thiago');

        data.append('image', e.target.files[0]);

        api.patch('/accounts', data).then((response) => {
          const { avatar } = response.data;

          if (response.data) {
            updateUser({
              name: user.name,
              email: user.email,
              password: user.password,
              avatar,
            });
          }

          addToast({
            type: 'success',
            title: 'Avatar atualizado!',
          });
        });
      }
    },
    [addToast, updateUser, user.email, user.name, user.password],
  );

  return (
    <Container>
      <Form
        onSubmit={handleProfile}
        ref={formRef}
        initialData={{
          name: user.name,
          email: user.email,
        }}
      >
        <Title>Profile</Title>
        <AvatarInput>
          <img
            src={`https://api-proffy-version-one.herokuapp.com/image/${user.avatar}`}
            alt={user.name}
          />
          <label htmlFor="avatar">
            <FiCamera />
            <input type="file" id="avatar" onChange={handleAvatarChange} />
          </label>
        </AvatarInput>

        <Input
          icon={FiUser}
          name="name"
          id="name"
          label="nome"
          placeholder="Nome"
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
          name="oldPassword"
          label="senha antiga"
          placeholder="sua senha antiga"
          type="password"
        />
        <Input
          icon={FiLock}
          name="password"
          label="senha"
          placeholder="Senha"
          type="password"
        />
        <Input
          icon={FiLock}
          name="confirmPassword"
          label="Confirmar senha"
          placeholder="Confirmar senha"
          type="password"
        />
        <Button type="submit">Concluir Alteração</Button>
        <Link to="/">Cancelar</Link>
      </Form>
    </Container>
  );
};

export default Profile;
