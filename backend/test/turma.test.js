import { describe } from "@jest/globals";

import TurmaController from '../controllers/turmaController';

// const controller = new TurmaController();

const res = {
  send: function () { },
  json: function (message) { return message },
  status: function () { return this }
}

describe('>> Teste unitários CADASTRAR', () => {
  it('Não é permitido criar uma turma sem o campo ORGANIZAÇÃO', async () => {
    const mock = { body: {
      localizacao: 'SESC AQUIDABÃ',
      esporte: 'VOLEI',
      data_de_fechamento: '05/11/2023',
      horarios: 'DAS 08H AS 12H'
    }};    

    const resposta = await TurmaController.cadastrarTurma(mock, res);

    await expect(resposta).toEqual('O campo ORGANIZAÇÃO é obrigatório!');
  });

  it('Não é permitido criar uma turma sem o campo LOCALIZAÇÃO', async () => {
    const mock = { body: {
      organizacao: 'SENAC',
      esporte: 'VOLEI',
      data_de_fechamento: '05/11/2023',
      horarios: 'DAS 08H AS 12H'
    }};

    const resposta = await TurmaController.cadastrarTurma(mock, res);

    await expect(resposta).toEqual('O campo LOCALIZAÇÃO é obrigatório!');
  });

  it('Não é permitido criar uma turma sem o campo ESPORTE', async () => {
    const mock = { body: {
      organizacao: 'SENAC',
      localizacao: 'SESC AQUIDABÃ',
      data_de_fechamento: '05/11/2023',
      horarios: 'DAS 08H AS 12H'
    }};

    const resposta = await TurmaController.cadastrarTurma(mock, res);

    await expect(resposta).toEqual('O campo ESPORTE é obrigatório!');
  });
});


describe('>> Teste unitários EDITAR', () => {
  it('Não é permitido atualizar uma turma sem enviar o identificador (ID)', async () => {
    const mock = {
      params: { },
      body: {
        organizacao: 'SENAC',
        esporte: 'VOLEI',
        data_de_fechamento: '05/11/2023',
        horarios: 'DAS 08H AS 12H'
      }
    };

    const resposta = await TurmaController.atualizarTurma(mock, res);

    await expect(resposta).toEqual('Não foi possível identificar a turma!');
  });

  it('Não é permitido criar uma turma sem o campo HORARIOS', async () => {
    const mock = {
      params: { id: 1 },
      body: {
        localizacao: 'SESC AQUIDABÃ',
        organizacao: 'SENAC',
        esporte: 'VOLEI',
        data_de_fechamento: '05/11/2023',
      }
    };

    const resposta = await TurmaController.atualizarTurma(mock, res);

    await expect(resposta).toEqual('O campo HORARIOS é obrigatório!');
  });
});


describe('>> Teste de aceitação', () => {
  it('Fluxo correto do CRUD da Turma', async () => {
    const params = { id: 2 };
    const body = {
      organizacao: 'SENAC',
      esporte: 'VOLEI',
      localizacao: 'SESC AQUIDABÃ',
      data_de_fechamento: '05/11/2023',
      horarios: 'DAS 08H AS 12H'      
    }

    const mockEditar = { params, body };
    const mockConsultar = { params };
    
    const respostaCriar = await TurmaController.cadastrarTurma({body}, res);
    const respostaEditar = await TurmaController.atualizarTurma(mockEditar, res);
    const respostaConsulta = await TurmaController.listarTurmaPorId(mockConsultar, res);

    // Criar
    await expect(respostaCriar.message).toEqual("turma criada");

    // Atualizar
    await expect(respostaEditar.message).toEqual("turma atualizada");

    // Consultar
    await expect(respostaConsulta.id).toEqual(2);
  });
});