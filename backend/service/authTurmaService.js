
import Turma from '../models/turma.js';


class TurmaAuthService {

  async cadastrarTurma(data) {
    try {
      if (!data.organizacao) {
        throw new Error('O campo ORGANIZAÇÃO é obrigatório!');
      }
  
      if (!data.localizacao) {
        throw new Error('O campo LOCALIZAÇÃO é obrigatório!');
      }

      if (!data.esporte) {
        throw new Error('O campo ESPORTE é obrigatório!');
      }

      if (!data.data_de_fechamento) {
        throw new Error('O campo DATA é obrigatório!');
      }

      if (!data.horarios) {
        throw new Error('O campo HORARIOS é obrigatório!');
      }
      
      const turma = new Turma(data);
      const resposta = await turma.criar(turma);
      return { message: 'turma cadastrada', content: resposta };
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default TurmaAuthService;