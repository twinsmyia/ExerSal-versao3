import express from 'express';
import TurmaController from '../controllers/turmaController.js';

const router = express.Router();

router
  .get('/turma', TurmaController.listarTurma)
  .get('/turma/:id', TurmaController.listarTurmaPorId)
  .post('/turma', TurmaController.cadastrarTurma)
  .patch('/turma/:id', TurmaController.atualizarTurma)
  .delete('/turma/:id', TurmaController.excluirTurma);

export default router;