import express from 'express';
const app = express();

import cors from 'cors';

import { promises } from 'fs';
const readFile = promises.readFile;
const writeFile = promises.writeFile;

import accountRoute from './routes/accounts.js';
import database from './configs/database.config.js';
import logger from './configs/logger.config.js';

import swaggerUI from 'swagger-ui-express';
import { swaggerDocument } from './documentation/doc.js';

// Confgs do express
app.use(express.json());
app.use(cors());
app.use('/accounts', accountRoute);
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get('/', (req, res) => {
  return res.send('/');
});

// Servidor
app.listen(3333, async () => {
  try {
    await readFile(database.account, 'utf-8');
  } catch (error) {
    const initAccount = {
      nextId: 1,
      accounts: [],
    };
    writeFile(database.account, JSON.stringify(initAccount));
    logger.info('Account Database Created.');
  }
});
