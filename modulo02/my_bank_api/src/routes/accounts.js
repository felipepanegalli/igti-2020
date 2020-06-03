const express = require('express');
const fs = require('fs');
const route = express.Router();
const accountDbPath = 'src/database/accounts.json';

route.post('/', (req, res) => {
  let account = req.body;
  // Le o arquivo json
  fs.readFile(accountDbPath, 'utf-8', (err, data) => {
    if (!err) {
      try {
        let json = JSON.parse(data);
        account = { id: json.nextId++, ...account };
        json.accounts.push(account);

        fs.writeFile(accountDbPath, JSON.stringify(json), (err) => {
          if (err) res.status(400).send({ error: err.message });
          res.status(201).end();
        });
      } catch (err) {
        res.status(400).send({ error: err.message });
      }
    } else {
      res.status(400).send({ error: err.message });
    }
  });
});

route.get('/', (req, res) => {
  fs.readFile(accountDbPath, 'utf-8', (err, data) => {
    if (err) res.status(400).send({ error: err.message });

    data = JSON.parse(data);
    delete data.nextId;
    res.send(data);
  });
});

module.exports = route;
