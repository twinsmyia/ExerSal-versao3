import React, { useState } from "react";
import './CardList.css';

const CardList = ({ consultarTurma, lista }) => {
  console.log(lista)
  return (
    <div className="CardList">
      { lista ? lista.map((content, index) => {
        console.log(index)
        return (
          <div key={index} className="card" onClick={() => consultarTurma(content.id)}>
            <h3>{content?.organizacao}</h3>
            <h6>{content?.localizacao}</h6>
            <p className='mt-1' dangerouslySetInnerHTML={{ __html: content?.descricao}}></p>
            <h6 className='mt-3'>HORÁRIOS</h6>
            <p dangerouslySetInnerHTML={{ __html: content?.horarios}}></p>
          </div>
        );
        }) : ''
      }
    </div>
  );
}

export default CardList