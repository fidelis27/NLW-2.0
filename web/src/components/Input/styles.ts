import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}
export const Container = styled.div<ContainerProps>`
  width: 100%;
  & + div {
    margin-top: 1.4rem;
  }

  label {
    font-size: 1.4rem;
    ${(props) =>
      props.isFocused &&
      css`
        color: var(--color-text-in-primary);
        font-weight: bold;
      `}
    ${(props) =>
      props.isFilled &&
      css`
        color: var(--color-text-in-primary);
        font-weight: bold;
      `}
  }

  input {
    width: 100%;
    height: 5.6rem;
    margin-top: 0.8rem;
    border-radius: 0.8rem;
    background: var(--color-input-background);
    border: 1px solid var(--color-line-in-white);
    outline: 0;
    padding: 0 1.6rem;
    font: 1.6rem Archivo;

    ${(props) =>
      props.isFocused &&
      css`
        border: 1px solid var(--color-text-in-primary);
        color: var(--color-text-in-primary);
      `}
  }

  /*  :focus-within::after {
    width: calc(100% - 3.2rem);
    height: 2px;
    content: '';
    background: var(--color-primary-light);
    position: absolute;
    left: 1.6rem;
    right: 1.6rem;
    bottom: 0;
  } */

  svg {
    color: var(--color-text-complement);
    margin-right: 2.6rem;
    ${(props) =>
      props.isFocused &&
      css`
        color: var(--color-text-in-primary);
      `}
    ${(props) =>
      props.isFilled &&
      css`
        color: var(--color-text-in-primary);
      `}
  }
`;

export const InputLabel = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const ErrorMessage = styled.span`
  color: var(--color-text-in-primary);
`;
