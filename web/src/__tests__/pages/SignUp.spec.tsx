import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react/';
import SignUp from '../../pages/SignUp';

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

describe('SignIn Page', () => {
  beforeEach(() => mockedHistoryPush.mockClear());

  it('should be able to signUp ', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const NameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('example@seuemail.com');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Concluir cadastro');

    fireEvent.change(NameField, { target: { value: 'thiago' } });
    fireEvent.change(emailField, { target: { value: 'thigo@email.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });

  it('should not be able to signUp invalid credentials ', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const NameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('example@seuemail.com');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Concluir cadastro');

    fireEvent.change(NameField, { target: { value: 'thiago' } });
    fireEvent.change(emailField, { target: { value: 'thiagoemail.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should display an error if SignUp fails ', async () => {
    mockedSignIn.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<SignUp />);
    const NameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('example@seuemail.com');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Concluir cadastro');

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
