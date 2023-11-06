
/*import Turma from '../models/turma.js';*/
import TurmaService from '../service/turmaService.js'

const turmaService = new  TurmaService();

class TurmaController {
  /*


  static listarTurma = async (_, res) => {
    try {
      const resultado = await Turma.pegarTurma();
      return res.status(200).json(resultado);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static listarTurmaPorId = async (req, res) => {
    const { params } = req;
    try {
      const resultado = await Turma.pegarPeloId(params.id);
      return res.status(200).json(resultado);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static cadastrarTurma = async (req, res) => {
    const { body } = req;
    const turma = new Turma(body);
    try {
      const resposta = await turma.criar(turma);
      return res.status(201).json({ message: 'turma criada', content: resposta });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static atualizarTurma = async (req, res) => {
    const { params } = req;
    const { body } = req;
    try {
      const turmaAtual = await Turma.pegarPeloId(params.id);
      const novaTurma = new Turma({ ...turmaAtual, ...body });
      const resposta = await novaTurma.salvar(novaTurma);
      return res.status(200).json({ message: 'turma atualizado', content: resposta });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static excluirTurma = async (req, res) => {
    const { params } = req;
    try {
      await Turma.excluir(params.id);
      return res.status(200).json({ message: 'turma excluído' });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };
*/
static listarTurma = async (req, res) => {
  try {
    const resultado = await turmaService.listarTurma();

    return res.status(200).json(resultado);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

static listarTurmaPorId = async (req, res) => {
  const { params } = req;
  try {
    const resultado = await turmaService.listarTurmaPorId(params.id);

    return res.status(200).json(resultado);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

static cadastrarTurma = async (req, res) => {
  const { body } = req;
  try {
    const resposta = await turmaService.cadastrarTurma(body);

    return res.status(201).json(resposta);
  } catch (err) {
    if (err.message === 'corpo da requisicao vazio') {
      return res.status(400).json(err.message);
    }

    return res.status(500).json(err.message);
  }
};

static atualizarTurma = async (req, res) => {
  const { params } = req;
  const { body } = req;
  try {
    const resposta = await turmaService.atualizarTurma(params.id, body);
    //console.log(resposta);
    //console.log(`ro: ${this.changes}`)

    return res.status(200).json(resposta);
    //return res.status(201).send({message: `turma com o id: ${id} atualizada`}).json(resposta)
  
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

static excluirTurma = async (req, res) => {
  const { params } = req;
  try {
    const excluir = await turmaService.excluirTurma(params.id);
    return res.status(200).json(excluir);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};


}

export default TurmaController;