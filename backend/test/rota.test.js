import request from 'supertest';
import { jest, afterEach, beforeEach, describe } from '@jest/globals';
import app from '../app';


let server;
let idResposta;

beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe((">> Testes de Integração"), () => {
  describe('GET   em /turma', () => {
    it('Deve retornar uma lista de turma', async () => {
      const resposta = await request(app)
        .get('/turma')
        .set('Accept', 'application/json')
        .expect('content-type', /json/)
        .expect(200);
  
      expect(resposta.body[0].organizacao);
    });
  });
  
  describe('POST  em /turma', () => {
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
  
  describe('GET   em /turma/id', () => {
    it('Deve retornar recurso selecionado', async () => {
      await request(app)
        .get(`/turma/${idResposta}`)
        .expect(200);
    });
  });
  
  describe('PUT   em /turma/atualizar/id', () => {
    test.each([
      { nome: 'organizacao', valor: 'Casa do Codigo'},
      { nome: 'localizacao', valor: 'SP'},
      { nome: 'esporte', valor: 'cdc@cdc.com'},
      { nome: 'data_de_fechamento', valor: 'cdc@cdc.com'},
      { nome: 'horarios', valor: 'cdc@cdc.com'},
      { nome: 'descricao', valor: 'cdc@cdc.com'}
    ])(`Deve alterar o campo $nome`, async ({ nome, valor }) => {
      const requisicao = { request };
      const spy = jest.spyOn(requisicao, 'request');
      const body = {
        organizacao: 'CDC',
        localizacao: 'sesc',
        esporte: 'hsdfs',
        data_de_fechamento: 'ddf',
        horarios: 'sdf',
        descricao: 'hhsdsd'
      }
  
      body[nome] = valor;
  
      await requisicao.request(app)
        .patch(`/turma/${idResposta}`)
        .send(body)
        .expect(200);
  
      expect(spy).toHaveBeenCalled();
    });
  });
  
  describe('DELETE em /turma/id', () => {
    it('Deletar o recurso adicionado', async () => {
      await request(app)
        .delete(`/turma/${idResposta}`)
        .expect(200);
    });
  });
})
