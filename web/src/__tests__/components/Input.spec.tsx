import React from 'react';

import { render, fireEvent, wait } from '@testing-library/react';

import Input from '../../components/Input';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});
jest.setTimeout(30000);

describe('Input component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" label="E-mail" id="email" placeholder="E-mail" />,
    );
    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  it('should render highlight on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" label="E-mail" id="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input');

    fireEvent.focus(inputElement);

    await wait(() => {
      expect(containerElement).toHaveStyle('border-color: #483D8B');
    });

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(containerElement).not.toHaveStyle('border-color:#483D8B');
    });
  });

  it('should keep input border higlight when input filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" label="E-mail" id="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input');

    fireEvent.change(inputElement, {
      target: {
        value: 'thiago@gmail.com',
      },
    });

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(containerElement).toHaveStyle({
        borderColor: '#228B22',
      });
    });
  });
});
