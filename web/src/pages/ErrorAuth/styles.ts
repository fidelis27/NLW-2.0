import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: var(--color-text-in-primary);
  background-color: var(--color-primary);
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 3.2rem;

  img {
    height: 10rem;
  }
  h2 {
    font-weight: 500;
    font-size: 2.4rem;
    line-height: 4.6rem;
    margin-top: 0.8rem;
  }
`;

export const Button = styled.div`
  display: flex;
  justify-content: center;
  margin: 3.2rem 0;

  a {
    width: 20rem;
    height: 7rem;
    border-radius: 0.8rem;
    margin-right: 1.6rem;
    font: 700 2.4rem Archivo;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: var(--color-button-text);
    transition: background-color 0.2s;

    img {
      width: 4rem;
      margin-right: 2.4rem;
    }
  }
`;
export const Connections = styled.span`
  font-size: 1.6rem;

  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;

  svg {
    margin-left: 0.8rem;
  }
`;
