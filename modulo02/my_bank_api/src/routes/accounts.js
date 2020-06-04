import express from 'express';
const router = express.Router();

import { promises } from 'fs';
const readFile = promises.readFile;
const writeFile = promises.writeFile;

import database from '../configs/database.config.js';
import logger from '../configs/logger.config.js';

router.post('/', async (req, res) => {
  let account = req.body;
  // Le o arquivo json
  try {
    const db = await readFile(database.account, 'utf-8');
    let data = JSON.parse(db);
    account = { id: data.nextId++, ...account };
    data.accounts.push(account);

    await writeFile(database.account, JSON.stringify(data));
    res.status(201).end();
    logger.info(
      `${req.method} ${req.originalUrl} - ${JSON.stringify(account.id)}`
    );
  } catch (error) {
    res.status(400).send({ error: error.message });
    logger.error(`${req.method} ${req.originalUrl} - ${error.message}`);
  }
});

router.get('/', async (req, res) => {
  try {
    const db = await readFile(database.account, 'utf-8');
    let data = JSON.parse(db);
    delete data.nextId;
    res.status(200).send(data);
    logger.info(`${req.method} ${req.originalUrl} - User listed all accounts`);
  } catch (error) {
    res.status(400).send({ error: error.message });
    logger.error(`${req.method} ${req.originalUrl} - ${error.message}`);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const db = await readFile(database.account, 'utf-8');
    let data = JSON.parse(db);
    data = data.accounts.find((account) => account.id === parseInt(id));
    if (!data) return res.status(404).send({ error: 'Account not found!' });
    res.send(data);
    logger.info(
      `${req.method} ${req.originalUrl} - ${JSON.stringify(data.id)}`
    );
  } catch (error) {
    res.status(400).send({ error: error.message });
    logger.error(`${req.method} ${req.originalUrl} - ${error.message}`);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const db = await readFile(database.account, 'utf-8');
    let data = JSON.parse(db);
    const account = data.accounts.filter(
      (account) => account.id !== parseInt(id)
    );
    data.accounts = account;
    await writeFile(database.account, JSON.stringify(data));
    res.status(200).end();
    logger.info(
      `${req.method} ${req.originalUrl} - ${JSON.stringify(data.id)}`
    );
  } catch (error) {
    res.status(400).send({ error: error.message });
    logger.error(`${req.method} ${req.originalUrl} - ${error.message}`);
  }
});

router.put('/', async (req, res) => {
  const { id, name, balance } = req.body;
  try {
    const db = await readFile(database.account, 'utf-8');
    let data = JSON.parse(db);
    let oldIndex = data.accounts.findIndex(
      (account) => account.id === parseInt(id)
    );
    if (oldIndex < 0)
      return res.status(404).send({ error: 'Account not found!' });
    data.accounts[oldIndex].name = name;
    data.accounts[oldIndex].balance = balance;
    await writeFile(database.account, JSON.stringify(data));
    res.end();
    logger.info(
      `${req.method} ${req.originalUrl} - ${JSON.stringify(
        data.accounts[oldIndex].id
      )}`
    );
  } catch (error) {
    res.status(400).send({ error: error.message });
    logger.error(`${req.method} ${req.originalUrl} - ${error.message}`);
  }
});

router.post('/transaction', async (req, res) => {
  const { id, value } = req.body;
  try {
    const db = await readFile(database.account, 'utf-8');
    let data = JSON.parse(db);
    let index = data.accounts.findIndex(
      (account) => account.id === parseInt(id)
    );
    if (index < 0) return res.status(404).send({ error: 'Account not found!' });
    //prettier-ignore
    if ((value < 0) && (data.accounts[index].balance + value) < 0){
      return res.status(400).send({ error: 'Não há saldo suficiente na conta.' });
    }

    data.accounts[index].balance += value;
    await writeFile(database.account, JSON.stringify(data));

    res.status(200).send(data.accounts[index]);
    logger.info(
      `${req.method} ${req.originalUrl} - ${JSON.stringify(
        data.accounts[index].id
      )}`
    );
  } catch (error) {
    res.status(400).send({ error: error.message });
    logger.error(`${req.method} ${req.originalUrl} - ${error.message}`);
  }
});

export default router;
