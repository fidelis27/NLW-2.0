import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  color: var(--color-text-complement);

  form {
    margin: 60px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4rem;
    max-width: 700px;
    background: var(--color-box-base);
    border-radius: 0.8rem;

    @media (min-width: 700px) {
      padding: 3rem;
    }
    input {
      width: 100%;
    }

    a {
      width: 100%;
      height: 5.6rem;
      background: var(--color-secundary);
      color: var(--color-button-text);
      border: 0;
      border-radius: 0.8rem;
      cursor: pointer;
      font: 700 1.6rem Archivo;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      transition: background-color 0.2s;
      margin-top: 1.2rem;

      :hover {
        background: var(--color-secundary-dark);
      }
    }
  }
`;

export const Title = styled.label`
  width: 100%;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 34px;
  margin-bottom: 5rem;
  color: var(--color-text-in-primary);
`;

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;
  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }
  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: var(--color-text-in-primary);
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    input {
      display: none;
    }
    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }
    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;
