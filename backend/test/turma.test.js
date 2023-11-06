import { describe } from "@jest/globals";

import TurmaAuthService from "../service/authTurmaService";

const turmaService = new TurmaAuthService();

describe('Testando a authService.cadastrarUsuario', () => {
    it('Não é permitido criar uma turma sem o campo ORGANIZAÇÃO', async () => {
      const usuarioMock = {
        localizacao: 'Raphael',
        esporte: 'hsdfs',
        data_de_fechamento: 'ddf',
        horarios: 'sdf'
      };
  
      const turmaSalvo = turmaService.cadastrarTurma(usuarioMock);
  
      await expect(turmaSalvo).rejects.toThrowError('O campo ORGANIZAÇÃO é obrigatório!', '');
    });
  });