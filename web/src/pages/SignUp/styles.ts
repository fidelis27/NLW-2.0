import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  color: var(--color-text-complement);
  @media (min-width: 700px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4rem;

    @media (min-width: 700px) {
      padding: 3rem;
    }
    input {
      width: 100%;
    }

    a {
      width: 100%;
      margin-bottom: 6rem;
      height: 3.2rem;
      transition: opacity 0.2s;
      text-decoration: none;
      color: var(--color-text-in-primary);
    }
    a:hover {
      opacity: 0.6;
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

export const SubTitle = styled.label`
  width: 100%;
  @media (min-width: 700px) {
    max-width: 22.2rem;
    align-self: flex-start;
  }
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 26px;
  margin-bottom: 4rem;
  color: var(--color-text-in-primary);
`;

export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--color-primary);

  h2 {
    color: var(--color-text-in-primary);
  }
`;
