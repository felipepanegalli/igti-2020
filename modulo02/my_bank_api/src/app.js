const express = require('express');
const fs = require('fs');
const app = express();

const accountDbPath = 'src/database/accounts.json';

// Rotas
const accountRoute = require('./routes/accounts');

// Confgs do express
app.use(express.json());
app.use('/accounts', accountRoute);

app.get('/', (req, res) => {
  res.send('/');
});

// Servidor
app.listen(3333, () => {
  try {
    fs.readFile(accountDbPath, 'utf-8', (err, data) => {
      if (err) {
        const initAccount = {
          nextId: 1,
          accounts: [],
        };
        fs.writeFile(accountDbPath, JSON.stringify(initAccount), (err) => {});
      }
    });
  } catch (error) {
    console.log(error);
  }
});
