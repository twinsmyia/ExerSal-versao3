
/*import Turma from '../models/turma.js';*/
import TurmaService from '../service/turmaService.js'

const turmaService = new  TurmaService();

class TurmaController {
 
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
    if (!body.organizacao) throw new Error('O campo ORGANIZAÇÃO é obrigatório!');

    if (!body.localizacao) throw new Error('O campo LOCALIZAÇÃO é obrigatório!');

    if (!body.esporte) throw new Error('O campo ESPORTE é obrigatório!');

    if (!body.data_de_fechamento) throw new Error('O campo DATA é obrigatório!');

    if (!body.horarios) throw new Error('O campo HORARIOS é obrigatório!');

    const resposta = await turmaService.cadastrarTurma(body);

    return res.status(201).json(resposta);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

static atualizarTurma = async (req, res) => {
  const { params, body } = req;

  try {
    if (!params.id) throw new Error('Não foi possível identificar a turma!');

    if (!body.organizacao) throw new Error('O campo ORGANIZAÇÃO é obrigatório!');

    if (!body.localizacao) throw new Error('O campo LOCALIZAÇÃO é obrigatório!');

    if (!body.esporte) throw new Error('O campo ESPORTE é obrigatório!');

    if (!body.data_de_fechamento) throw new Error('O campo DATA é obrigatório!');

    if (!body.horarios) throw new Error('O campo HORARIOS é obrigatório!');

    const resposta = await turmaService.atualizarTurma(params.id, body);

    return res.status(200).json(resposta);
  
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