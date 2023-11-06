import React, { useEffect, useState } from "react";
import FormTurma from '../../forms/FormTurma/FormTurma';
import CardList from '../../components/CardList/CardList';
import Notification from '../../components/Notification/Notification';
import api from '../../services/api';
import './Turma.css';

function Turma() {
  const [alert, setAlert] = useState({'show': false, 'message':'', 'variant':''});
  const [visualizarFormularioEdicao, setVisualizarFormularioEdicao] = useState(false);
  const [visualizarFormulario, setVisualizarFormulario] = useState(false);
  const [turma, setTurma] = useState();
  const [listaTurma, setListaTurma] = useState([]);

  const consultarTurma = (indice) => {
    setTurma(indice);
    setVisualizarFormulario(true);
    setVisualizarFormularioEdicao(true);
  }

  useEffect(() => listarTurmas(), []);

  function listarTurmas() {
    api
      .get("/turma", {})
      .then((response) => response.data)
      .then((data) => {
        data = data.map((item) => {
          item.descricao = item.descricao.replaceAll("\n", "<br>");
          item.horarios = item.horarios.replaceAll("\n", "<br>");
          return item;
        });
        
        setListaTurma(data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }

  function apagarTurma() {
    api
      .delete("/turma/"+ turma)
      .then((response) => {
        listarTurmas();
        setVisualizarFormulario(false);
        setVisualizarFormularioEdicao(false);
        setAlert({
          'show': true, 
          'message': 'Turma excluida com sucesso', 
          'variant': 'success'
        })
      })
      .catch(() => {
        setAlert({
          'show': true, 
          'message': 'Não foi possível excluir a turma', 
          'variant': 'danger'
        })
      });
  }

  return (
    <div className="Turma">
      {alert.show && <Notification props={{alert, setAlert}}/> }
      <div className='cabecalho'>
        <h6>Turmas</h6>
        { (visualizarFormularioEdicao) &&
          <button className="botao-apagar" onClick={() => apagarTurma()}>
            Apagar
          </button>
        }

        { (!visualizarFormulario && !visualizarFormularioEdicao) &&
          <button className="botao-nova-turma" onClick={() => setVisualizarFormulario(true)}>
            Nova Turma
          </button>
        }
      </div>


      {(visualizarFormulario) 
        ? <FormTurma indiceTurma={turma} consultarTurma={consultarTurma}></FormTurma> 
        :( <CardList 
            consultarTurma={consultarTurma}
            lista={listaTurma}
          ></CardList>)
      }

      { visualizarFormulario && 
        <button className="botao-voltar" onClick={() => window.location.reload()}>
          Voltar
        </button>
      }
    </div>
  );
}

export default Turma;