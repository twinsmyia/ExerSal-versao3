import React from "react";
import './Layout.css';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';

const Layout = ({ children }) => {
  return ( 
    <div className="Layout">
      <Menu></Menu>
      <div className='conteudo'>
        <Header></Header>
        <main>{children}</main>
      </div>
    </div>
  );
}

export default Layout;