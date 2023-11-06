
import Turma from '../models/turma.js';


class TurmaService {
  /*
  async listarTurma() {
    try {
      const resultado = await Turma.pegarTurma();

      return resultado;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async listarTurmaPorId(id) {
    try {
      const resultado = await Turma.pegarPeloId(id);

      return resultado;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async cadastrarTurma(body) {
    try {
      const turma = new Turma(body);
      const resposta = await turma.criar(turma);

      return { message: 'turma criada', content: resposta };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async atualizarTurma(id, body) {
    try {
      const turmaAtual = await Turma.pegarPeloId(id);
      const novaTurma = new Turma({ ...turmaAtual, ...body });
      const resposta = await novaTurma.salvar(novaTurma);

      return { message: 'turma atualizada', content: resposta };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async excluirTurma(id) {
    try {
      await Turma.excluir(id);
      return { message: 'turma excluída' };
    } catch (err) {
      throw new Error(err.message);
    }
  }
*/
async listarTurma() {
  try {
    const resultado = await Turma.pegarTurma();

    return resultado;
  } catch (err) {
    throw new Error(err.message);
  }
};

async listarTurmaPorId(id) {
  try {
    const resultado = await Turma.pegarPeloId(id);

    return resultado;
  } catch (err) {
    throw new Error(err.message);
  }
};

async cadastrarTurma(body) {
  try {
    const turma = new Turma(body);
    
    if (Object.keys(body).length === 0) {
      throw new Error('corpo da requisicao vazio');
    }

    const resposta = await turma.criar(turma);

    return { message: 'turma criada', content: resposta };
  } catch (err) {
    if (err.message === 'corpo da requisicao vazio') {
      throw new Error(err.message);
    }
    throw new Error(err.message);
  }
};

async atualizarTurma(id, body) {
  try {
    const turmaAtual = await Turma.pegarPeloId(id);
    const novaTurma = new Turma({ ...turmaAtual, ...body });
    const resposta = await novaTurma.salvar(novaTurma);

    return { message: 'turma atualizada', content: resposta };
  } catch (err) {
    throw new Error(err.message);
  }
};

async excluirTurma(id) {
  try {
    await Turma.excluir(id);

    return { message: 'turma excluída' };
  } catch (err) {
    throw new Error(err.message);
  }
};


}

export default TurmaService;