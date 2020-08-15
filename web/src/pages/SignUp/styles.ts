import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  color: var(--color-text-complement);

  form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 5rem 12rem;
    a {
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
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 34px;
  margin-bottom: 5rem;
  color: var(--color-text-in-primary);
`;

export const SubTitle = styled.label`
  max-width: 22.2rem;
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
