import express  from 'express';
import TurmaController from '../controllers/turmaController.js';

const turmaRoute = express.Router();

const {
  exibir,
  consultar,
  adiciona,
  editar,
  excluir
} = TurmaController();

turmaRoute.get('/', exibir);

turmaRoute.get('/:id', consultar);

turmaRoute.post('/', adiciona);

turmaRoute.patch('/:id', editar);

turmaRoute.delete('/:id', excluir);

export default turmaRoute
