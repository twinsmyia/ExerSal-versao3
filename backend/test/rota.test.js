import request from 'supertest';
import { jest, afterEach, beforeEach, describe } from '@jest/globals';
import app from '../app';


let server
beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('GET em /turma', () => {
  it('Deve retornar uma lista de turma', async () => {
    const resposta = await request(app)
      .get('/turma')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);

    expect(resposta.body[0].organizacao);
  });
});

let idResposta;
describe('POST em /turma', () => {
  it('Deve adicionar uma nova turma', async () => {
    const resposta = await request(app)
      .post('/turma')
      .send({
        organizacao: 'CDC',
        localizacao: 'sesc',
        esporte: 'hsdfs',
        data_de_fechamento: 'ddf',
        horarios: 'sdf',
        descricao: 'hhsdsd',
      })
      .expect(201);

    idResposta = resposta.body.content.id;
  });
});

describe('GET em /turma/id', () => {
  it('Deve retornar recurso selecionado', async () => {
    await request(app)
      .get(`/turma/${idResposta}`)
      .expect(200);
  });
});

describe('PUT em /turma/atualizar/id', () => {
  test.each([
    ['id', { id: 0 }],
    ['organizacao', { organizacao: 'Casa do Codigo' }],
    ['localizacao', { localizacao: 'SP' }],
    ['esporte', { esporte: 'cdc@cdc.com' }],
    ['data_de_fechamento', { data_de_fechamento: 'cdc@cdc.com' }],
    ['horarios', { horarios: 'cdc@cdc.com' }],
    ['descricao', { descricao: 'cdc@cdc.com' }],
    ['created_at', {created_at: ''}],
    ['updated_at', {updated_at: '2023-11-05T23:45:16.221Z'}],
  ])('Deve alterar o campo %s', async (param) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, 'request');
    await requisicao.request(app)
      .patch(`/turma/${idResposta}`)
      .send(param)
      .expect(200);

    expect(spy).toHaveBeenCalled();
  });
});

describe('DELETE em /turma/id', () => {
  it('Deletar o recurso adcionado', async () => {
    await request(app)
      .delete(`/turma/${idResposta}`)
      .expect(200);
  });
});