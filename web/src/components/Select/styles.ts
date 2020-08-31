import styled from 'styled-components';

export const SelectBlock = styled.div`
  position: relative;

  + div {
    margin-top: 1.4rem;
  }

  label {
    font-size: 1.4rem;
  }

  select {
    width: 100%;
    height: 5.6rem;
    margin-top: 0.8rem;
    border-radius: 0.8rem;
    background: var(--color-select-background);
    border: 1px solid var(--color-line-in-white);
    outline: 0;
    padding: 0 1.6rem;
    font: 1.6rem Archivo;
  }

  span {
    margin-top: 0.8rem;
  }

  :focus-within::after {
    width: calc(100% - 3.2rem);
    height: 2px;
    content: '';
    background: var(--color-primary-light);
    position: absolute;
    left: 1.6rem;
    right: 1.6rem;
    bottom: 0;
  }

  @media (min-width: 700px) {
    + div {
      margin-top: 0;
    }
  }
`;
