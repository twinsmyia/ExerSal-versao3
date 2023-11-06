import express from 'express';

import routerturma from './routes/turmaRoutes.js';

const routes = (app) => {
  app.route('/').get((_, res) => {
    res.status(200).send({ titulo: 'Turma' });
  });

  app.use(
    express.json(),
    routerturma,
  );
};

export default routes;