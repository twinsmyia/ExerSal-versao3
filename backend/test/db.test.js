import db from "../db/dbconfig.js";
import { describe, expect } from "@jest/globals";

describe('Testando configDB', () => {
    it('Teste de conexão com o banco de dados', async () => {
      const turmaMock = {
        organizacao: 'SESC',
        localizacao: 'Aquidabã',
        esporte: 'dsfd',
        data_de_fechamento: 'ddf',
        horarios: 'sdf',
        descricao: 'hhsdsd',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
  
      const turmaSalvo = await db('TurmaCerto').insert(turmaMock)
        .then((retorno) => db('TurmaCerto')
          .where('id', retorno[0]))
        .then((turmaSelecionada) => turmaSelecionada[0]);
  
      expect(turmaSalvo.organizacao).toBe(turmaMock.organizacao);
  
      await db('TurmaCerto').where({ id: turmaSalvo.id }).del();
    });
  
  });



