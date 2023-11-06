import React from "react";
import './Header.css';

const Header = () => {
  return (
    <div className='cabecalho'>
      <p>SEJA BEM-VINDO, ADMINISTRADOR</p>
      <h1>Gabriel Fonseca</h1>
      <div className='botao-sair'><p>SAIR</p></div>
      <hr/>
    </div>
  );
}

export default Header;