import React from "react";
import './Menu.css';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <header className='menu-principal'>
      <div className='menu-conteudo'>
        <img src="images/exercite-logo.png"></img>
        <hr/>
        <ul>
          <Link to="/"><li>Início</li></Link>
          <Link to="/#"><li>Esportes</li></Link>
          <Link to="/#"><li>Eventos</li></Link>
          <Link to="/turma"><li>Turmas</li></Link>
        </ul>
      </div>
    </header>
  );
}

export default Menu;