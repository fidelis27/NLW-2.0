import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  color: var(--color-text-in-primary);
  background: var(--color-primary);
`;

export const LandingContent = styled.div`
  display: flex;

  img {
    width: 50rem;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3.2rem;
  img {
    height: 30rem;
  }
  h2 {
    font-weight: 500;
    font-size: 2.4rem;
    line-height: 4.6rem;
    margin-top: -8rem;
    width: 30rem;
  }
`;
export const Header = styled.header`
  width: 100%;
  padding: 0 20rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 3.2rem;
  button {
    border: 0;
    background: var(--color-primary);
    display: flex;
    align-items: center;
    height: 3.2rem;
    transition: opacity 0.2s;
    text-decoration: none;
    color: var(--color-text-in-primary);
    svg {
      margin-left: 1.6rem;
    }
  }
`;

export const UserInfo = styled.div`
  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }
`;

export const Footer = styled.footer`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  justify-content: space-between;
  width: 100%;
  padding: 0 10rem;
  margin-top: 3.2rem;

  p {
    width: 16rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 20rem;
    svg {
      margin-left: 1.2rem;
    }
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 3.2rem 2rem;
  a {
    width: 30rem;
    height: 8.4rem;
    border-radius: 0.8rem;
    margin-right: 1.6rem;
    font: 700 2rem Archivo;

    display: flex;
    align-items: center;
    justify-content: center;

    text-decoration: none;
    color: var(--color-button-text);
    transition: background-color 0.2s;
    :first-child {
      margin-right: 1.6rem;
    }
    img {
      width: 4rem;
      margin-right: 2.4rem;
    }
  }
  a.study {
    background: var(--color-primary-lighter);
  }
  a.give-classes {
    background: var(--color-secundary);
  }

  a.study:hover {
    background: var(--color-primary-light);
  }
  a.give-classes:hover {
    background: var(--color-secundary-dark);
  }
`;
