import express from 'express';
import routes from './index.js';
import cors from 'cors';

const app = express();

//Implementando algumas configurações no projeto
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*' }));

routes(app);

export default app;