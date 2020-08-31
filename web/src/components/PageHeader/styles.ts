import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  flex-direction: column;
  background-color: var(--color-primary);

  @media (min-width: 700px) {
    height: 340px;
  }
`;

export const Topbar = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-text-in-primary);
  padding: 2.6rem 0;

  @media (min-width: 700px) {
    max-width: 1100px;
  }

  a {
    display: flex;
    align-items: center;
    height: 3.2rem;
    transition: opacity 0.2s;
    text-decoration: none;
    color: var(--color-secundary);
    font-size: 2.2rem;

    svg {
      margin-right: 1.6rem;
    }

    :hover {
      opacity: 0.6;
    }
  }
  img {
    height: 2.6rem;
  }
`;

export const HeaderContent = styled.div`
  width: 90%;
  margin: 0 auto;
  position: relative;
  margin: 3.2rem auto;

  @media (min-width: 700px) {
    flex: 1;
    max-width: 940px;
    margin: 0 auto;
    padding-bottom: 48px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  strong {
    @media (min-width: 700px) {
      max-width: 350px;
    }
    font: 700 3.6rem Archivo;
    line-height: 4.2rem;
    color: var(--color-title-in-primary);
  }

  p {
    font-size: 2rem;
    line-height: 2.6rem;
    color: var(--color-text-in-primary);
    margin-top: 2.4rem;
  }
`;
