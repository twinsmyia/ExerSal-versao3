import React, { useState, useEffect } from 'react';

import './FormTurma.css';
import api from '../../services/api';
import Notification from '../../components/Notification/Notification';

const FormTurma = ({ indiceTurma, consultarTurma }) => {
  const [formEdicao, setformEdicao] = useState(false);
  const [diaAtual, setDiaAtual] = useState({});
  const [turma, setTurma] = useState({});
  const [isEnableButton, setIsEnableButton] = useState(false);

  const [alert, setAlert] = useState({'show': false, 'message':'', 'variant':''});
  const [errorMessages, setErrorMessages] = useState({});
  const [formData, setFormData] = useState({
    organizacao: '',
    esporte: '',
    horarios: '',
    data_de_fechamento: '',
    localizacao: '',
    descricao: ''
  });


  useEffect(() => {
    setDiaAtual(formataDataHoje());

    if (indiceTurma) {
      setformEdicao(true);
      consultar();
    }
  }, []);

  useEffect(() => {
    const areAllInputsHaveValues = Object.values(formData).every(element => element !== '');
    setIsEnableButton(areAllInputsHaveValues);
  }, [formData]);


  function handleOnChangeInput({ target }) {
    const { name, value } = target;

    setFormData({ ...formData, [name]: value });

    const msg = value === '' ? 'Campo Obrigatório' : '';
    setErrorMessages({ ...errorMessages, [name]: msg });
  }

  function handleOnFocusInput({ target }) {
    const { name, value } = target;
    
    const msg = value === '' ? 'Campo Obrigatório' : '';
    setErrorMessages({ ...errorMessages, [name]: msg });
  }

  function consultar() {
    api
      .get("/turma/"+ indiceTurma)
      .then((response) => {
        const {data} = response;
        data.data_de_fechamento = formataData(data.data_de_fechamento);
        setFormData({...data});
        setTurma({...data});
      })
      .catch(() => {
        setAlert({
          'show': true, 
          'message': 'Não foi possível consultar as informações da turma', 
          'variant': 'danger'
        })
      });
  }

  function submit(event, formData) {
    event.preventDefault();
    const body = {...formData };

    if (avalidarData()) {
      formEdicao ? editar(body) : cadastrar(body)
    } else {
      setAlert({
        'show': true, 
        'message': "Data inválida. Informe uma data deste ano e a partir da data de hoje.", 
        'variant': 'danger'})
    }
  }

  function avalidarData() {
    const dataValida = new Date(diaAtual);
    const dataEscolhida = new Date(formData.data_de_fechamento);

    return (dataValida < dataEscolhida) && (dataEscolhida.getFullYear() == 2023);
  }

  function cadastrar(body) {
    api
      .post("/turma", body)
      .then((response) => {
        const {data} = response;
        setAlert({
          'show': true, 
          'message': 'Cadastro realizado com sucesso', 
          'variant': 'success'
        })

        setformEdicao(true);
        setTurma(data);
        consultarTurma(data.id);
        indiceTurma = data.id;
      })
      .catch((err) => {
        const message = err?.response?.data?.message;
        setAlert({'show': true, 'message': message, 'variant': 'danger'})
      });
  }

  function editar(body) {
    api
      .patch(`/turma/${turma.id}`, body)
      .then((response) => {
        const {data} = response;
        setAlert({
          'show': true, 
          'message': "Atualização realizada com sucesso." , 
          'variant': 'success'})
      })
      .catch((err) => {
        setAlert({
          'show': true, 
          'message': "Não foi possível realizar a atualização. Por favor tente mais tarde.", 
          'variant': 'danger'})
      });
  }

  function formataData(dataOriginal) {
    const data = dataOriginal.split('/');

    if (data.length > 1) {
      const [dd, mm, aaaa] = data;
      let ano = aaaa;
  
      if (aaaa.length < 4) ano = `20${aaaa}`;
  
      return `${ano}-${mm}-${dd}`;
    }

    return dataOriginal;
  }

  function formataDataHoje() {
    const data = new Date();
    const aaaa = data.getFullYear();
    const mm = data.getMonth() + 1;
    const dd = data.getDate();

    return `${aaaa}-${mm}-${dd}`;
  }

  return (
    <div className='FormTurma'>
      {alert.show && <Notification props={{alert, setAlert}}/> }
      <form onSubmit={e => submit(e, formData)}>
        <button className="btn botao-cadastro" disabled={!isEnableButton}>
          { formEdicao ? "Atualizar" : "Cadastrar" }
        </button>
        <div className="form-coluna">
          <div className="form-coluna-1">
            <div className="field">
              <label htmlFor="organizacao" className="form-label">Organização</label>
              <input type="text" className="form-control form-name" id="organizacao" name="organizacao" onChange={handleOnChangeInput} onFocus={handleOnFocusInput} value={formData?.organizacao} required />
              <span className="error" id="error-nameSerie">{errorMessages?.organizacao}</span>
            </div>

            <div className="field">
              <label htmlFor="esporte" className="form-label">Esporte</label>
              <input type="text" className="form-control form-name" id="esporte" name="esporte" onChange={handleOnChangeInput} onFocus={handleOnFocusInput} value={formData?.esporte} required />
              <span className="error" id="error-nameSerie">{errorMessages?.name}</span>
            </div>

            <div className="field">
              <label htmlFor="horarios" className="form-label">Horários</label>
              <textarea className="form-control" id="horarios" name="horarios" required placeholder='Dia - XH às XH' onChange={handleOnChangeInput} onFocus={handleOnFocusInput} value={formData.horarios}></textarea>
              <span className="error" id="error-nameSerie">{errorMessages?.name}</span>
            </div>
          </div>

          <div className="form-coluna-2">
            <div className="field">
              <label htmlFor="localizacao" className="form-label">Localização</label>
              <input type="text" className="form-control form-name" id="localizacao" name="localizacao" onChange={handleOnChangeInput} onFocus={handleOnFocusInput} value={formData?.localizacao} required />
              <span className="error" id="error-nameSerie">{errorMessages?.name}</span>
            </div>

            <div className="field">
              <label htmlFor="data_de_fechamento" className="form-label">Data de Fechamento</label>
              <input type="date" min={diaAtual} className="form-control form-name" id="data_de_fechamento" name="data_de_fechamento" onChange={handleOnChangeInput} onFocus={handleOnFocusInput} value={formData?.data_de_fechamento} />
              <span className="error" id="error-nameSerie">{errorMessages?.name}</span>
            </div>

            <div className="field">
              <label htmlFor="descricao" className="form-label">Descrição e Requisitos</label>
              <textarea className="form-control" id="descricao" name="descricao" onChange={handleOnChangeInput} onFocus={handleOnFocusInput} value={formData.descricao}></textarea>
              <span className="error" id="error-nameSerie">{errorMessages?.name}</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormTurma;