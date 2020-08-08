import React from 'react';

import whatsapp from '../../assets/images/icons/whatsapp.svg';
import './styles.css';

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars3.githubusercontent.com/u/45233696?s=460&u=3d6e00bcaf41ebc95a6affb75f4a5f1988662df2&v=4"
          alt="Thiago Fidelis"
        />
        <div>
          <strong>Thiago Fidelis</strong>
          <span>Física</span>
        </div>
      </header>
      <p>
        Entusiasta das melhores tecnologias.
        <br />
        <br />
        Apaixonado por tecnlogias e sempre em busca de novas skills
      </p>
      <footer>
        <p>
          Preço/hora
          <strong>R$80,00</strong>
        </p>
        <button type="button">
          <img src={whatsapp} alt="Entrar em contato" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
};

export default TeacherItem;
