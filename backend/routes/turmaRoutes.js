import express from 'express';
import TurmaController from '../controllers/turmaController.js';

//const express = express();
const router = express.Router();
//Implementando algumas configurações no projeto
/*express.use(express.json({ limit: '100mb' }));
express.use(express.urlencoded({ extended: false }));
express.use(cors({ origin: '*' }));
*/


router
  .get('/turma', TurmaController.listarTurma)
  .get('/turma/:id', TurmaController.listarTurmaPorId)
  .post('/turma', TurmaController.cadastrarTurma)
  .patch('/turma/:id', TurmaController.atualizarTurma)
  .delete('/turma/:id', TurmaController.excluirTurma);



export default router;