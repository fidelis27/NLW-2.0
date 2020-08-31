import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react/';
import Profile from '../../pages/Profile';

const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
    }),
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('Profile Page', () => {
  beforeEach(() => mockedHistoryPush.mockClear());

  it('should be able to Profile ', async () => {
    const { getByPlaceholderText, getByText } = render(<Profile />);

    const NameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('example@seuemail.com');
    const passwordField = getByPlaceholderText('Senha');
    const OldPasswordField = getByPlaceholderText('sua senha antiga');
    const confirmPasswordField = getByPlaceholderText('Confirmar senha');
    const buttonElement = getByText('Concluir Alteração');

    fireEvent.change(NameField, { target: { value: 'thiago' } });
    fireEvent.change(emailField, { target: { value: 'thigo@email.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });
    fireEvent.change(OldPasswordField, { target: { value: '123456' } });
    fireEvent.change(confirmPasswordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });

  it('should not be able to profile update ', async () => {
    const { getByPlaceholderText, getByText } = render(<Profile />);

    const NameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('example@seuemail.com');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Concluir Alteração');

    fireEvent.change(NameField, { target: { value: 'thiago' } });
    fireEvent.change(emailField, { target: { value: 'thiagoemail.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should display an error if Profile fails ', async () => {
    mockedSignIn.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<Profile />);
    const NameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('example@seuemail.com');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Concluir Alteração');

    fireEvent.change(NameField, { target: { value: 'thiago' } });
    fireEvent.change(emailField, { target: { value: 'thigo@email.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });
});
