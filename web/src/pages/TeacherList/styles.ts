import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  @media (min-width: 700px) {
    max-width: 100%;
    main {
      padding: 3.2rem 0;
      max-width: 940px;
      margin: 0 auto;
    }
  }

  main {
    margin: 3.2rem auto;
    width: 90%;
  }
`;

export const SearchTeachers = styled.div`
  form {
    margin-top: 3.2rem;

    label {
      color: var(--color-text-in-primary);
    }
  }
`;

export const Block = styled.div`
  position: relative;

  @media (min-width: 700px) {
    max-width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 16px;
    position: absolute;
    bottom: -28px;
    align-items: center;
    margin-top: 0;
    input,
    select,
    button {
      /*   margin-top: 0; */
      padding: 0;
    }
  }

  input,
  select,
  button {
    padding: 0 1.6rem;
  }
`;

export const Button = styled.button`
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
  margin-top: 3.2rem;

  :hover {
    background: var(--color-secundary-dark);
  }

  @media (min-width: 700px) {
    align-self: flex-end;
  }
`;
