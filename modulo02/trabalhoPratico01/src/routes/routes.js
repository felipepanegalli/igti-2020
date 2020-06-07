import express from 'express';
const router = express.Router();

import { promises } from 'fs';
const writeFile = promises.writeFile;
const readFile = promises.readFile;

import database from '../configs/database.config.js';

let globalStates = [];
let result = [];

// Rota que faz o split do json em arquivos separados
router.get('/split/', async (req, res) => {
  try {
    let states = await readFile(database.states, 'utf-8');
    states = JSON.parse(states);

    let cities = await readFile(database.cities, 'utf-8');
    cities = JSON.parse(cities);

    states.map((st) => {
      let val = cities.filter((ci) => {
        if (st.ID === ci.Estado) {
          return ci;
        }
      });
      writeFile('src/database/' + st.Sigla + '.json', JSON.stringify(val));
    });

    res.send({ message: 'Cidades separadas por Estado.' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Rota que exibe as cidades por estado (arquivo separado)
router.get('/state/:uf', async (req, res) => {
  const { uf } = req.params;
  try {
    let cities = await readFile('src/database/' + uf + '.json', 'utf-8');
    cities = JSON.parse(cities);
    res.send(cities);
  } catch (error) {
    res.status(400).send({ error: 'Estado não encontrado. Digite Ex: RS' });
  }
});

router.get('/ranking/', async (req, res) => {
  globalStates = [];
  let cities = await readFile(database.cities, 'utf-8');
  cities = JSON.parse(cities);

  let states = await readFile(database.states, 'utf-8');
  states = JSON.parse(states);

  states.forEach((state) => {
    let i = 0;
    cities.filter((city) => {
      if (state.ID === city.Estado) {
        i++;
      }
    });
    globalStates.push({ state: state.Sigla, qtd: i });
  });

  await writeFile(
    'src/database/cityByState.json',
    JSON.stringify(globalStates)
  );

  res.send(globalStates);
});

router.get('/ranking/top5', async (req, res) => {
  const file = await readFile(database.cityById, 'utf-8');
  const data = JSON.parse(file);
  data.sort((a, b) => b.qtd - a.qtd);

  let result = [];
  for (let i = 0; i < 5; i++) {
    result.push(data[i].state + ' - ' + data[i].qtd);
  }
  console.log(result);
  res.send(result);
});

router.get('/ranking/last5', async (req, res) => {
  const file = await readFile(database.cityById, 'utf-8');
  const data = JSON.parse(file);
  data.sort((a, b) => a.qtd - b.qtd);

  let result = [];
  for (let i = 0; i < 5; i++) {
    result.push(data[i].state + ' - ' + data[i].qtd);
  }
  console.log(result);
  res.send(result);
});

router.get('/ranking/cityTop', async (req, res) => {
  globalStates = [];
  let cities = await readFile(database.cities, 'utf-8');
  cities = JSON.parse(cities);

  let states = await readFile(database.states, 'utf-8');
  states = JSON.parse(states);

  states.forEach((state) => {
    let result = cities
      .filter((city) => state.ID === city.Estado)
      .sort((a, b) => b.Nome.length - a.Nome.length);

    globalStates.push({ city: result[0].Nome, state: state.Sigla });
  });

  globalStates
    .sort((a, b) => a.city.localeCompare(b.city))
    .sort((a, b) => b.city.length - a.city.length);
  console.log(globalStates);
  console.log(globalStates[0]);

  res.send(globalStates);
});

router.get('/ranking/cityLast', async (req, res) => {
  globalStates = [];
  let cities = await readFile(database.cities, 'utf-8');
  cities = JSON.parse(cities);

  let states = await readFile(database.states, 'utf-8');
  states = JSON.parse(states);

  states.forEach((state) => {
    let result = cities
      .filter((city) => state.ID === city.Estado)
      .sort((a, b) => a.Nome.length - b.Nome.length);

    globalStates.push({ city: result[0].Nome, state: state.Sigla });
  });

  globalStates
    .sort((a, b) => a.city.localeCompare(b.city))
    .sort((a, b) => a.city.length - b.city.length);
  console.log(globalStates);
  console.log(globalStates[0]);

  res.send(globalStates);
});

const init = async () => {
  try {
    //:::::::::::::::: Etapa 01 :::::::::::::::::://
    // Faz o parse do Estado
    let states = await readFile(database.states, 'utf-8');
    states = JSON.parse(states);

    // Faz o parse das cidades
    let cities = await readFile(database.cities, 'utf-8');
    cities = JSON.parse(cities);

    // Separa todas as cidades por estado e cria seus respectivos json
    states.map((st) => {
      let val = cities.filter((ci) => {
        if (st.ID === ci.Estado) {
          return ci;
        }
      });
      writeFile('src/database/' + st.Sigla + '.json', JSON.stringify(val));
    });
    console.log(':: Etapa 01 - Arquivos separados :: OK');

    //:::::::::::::::: Etapa 02 :::::::::::::::::://
    // Lê um arquivo parseado na estapa anterior e calcula quantas cidades possue
    let parsedState = await readFile('src/database/RS.json', 'utf-8');
    parsedState = JSON.parse(parsedState);
    console.log(
      `:: Etapa 02 - Quantidade de cidades do RS é: ${parsedState.length} :: OK`
    );

    //:::::::::::::::: Etapa 03 :::::::::::::::::://
    globalStates = [];
    result = [];
    // Cria um array de quantidade de cidades por estado
    states.forEach((state) => {
      let i = 0;
      cities.filter((city) => {
        if (state.ID === city.Estado) {
          i++;
        }
      });
      globalStates.push({ state: state.Sigla, qtd: i });
    });

    globalStates.sort((a, b) => b.qtd - a.qtd);

    for (let i = 0; i < 5; i++) {
      result.push('\n' + globalStates[i].state + ' - ' + globalStates[i].qtd);
    }
    console.log(
      `:: Etapa 03 - 5 Estados que possuem mais cidades: ${result} :: OK`
    );

    //:::::::::::::::: Etapa 04 :::::::::::::::::://
    globalStates = [];
    result = [];

    states.forEach((state) => {
      let i = 0;
      cities.filter((city) => {
        if (state.ID === city.Estado) {
          i++;
        }
      });
      globalStates.push({ state: state.Sigla, qtd: i });
    });

    globalStates.sort((a, b) => a.qtd - b.qtd);

    for (let i = 0; i < 5; i++) {
      result.push('\n' + globalStates[i].state + ' - ' + globalStates[i].qtd);
    }
    console.log(
      `:: Etapa 04 - 5 Estados que possuem menos cidades: ${result} :: OK`
    );

    //:::::::::::::::: Etapa 05 e 07:::::::::::::::::://
    globalStates = [];

    states.forEach((state) => {
      let result = cities
        .filter((city) => state.ID === city.Estado)
        .sort((a, b) => b.Nome.length - a.Nome.length);

      globalStates.push({ city: result[0].Nome, state: state.Sigla });
    });

    globalStates
      .sort((a, b) => a.city.localeCompare(b.city))
      .sort((a, b) => b.city.length - a.city.length);

    result = [];
    globalStates.forEach((item) => {
      result.push('\n' + item.city + ' - ' + item.state);
    });

    console.log(
      `:: Etapa 05 - Lista das cidades com maior nome por estado: ${result} :: OK`
    );
    console.log(
      `:: Etapa 07 - Lista da cidade com maior nome dentre os estados: ${globalStates[0].city} - ${globalStates[0].state} :: OK`
    );
    //:::::::::::::::: Etapa 06 e 08:::::::::::::::::://
    globalStates = [];

    states.forEach((state) => {
      let result = cities
        .filter((city) => state.ID === city.Estado)
        .sort((a, b) => a.Nome.length - b.Nome.length);

      globalStates.push({ city: result[0].Nome, state: state.Sigla });
    });

    globalStates
      .sort((a, b) => a.city.localeCompare(b.city))
      .sort((a, b) => a.city.length - b.city.length);

    result = [];
    globalStates.forEach((item) => {
      result.push('\n' + item.city + ' - ' + item.state);
    });

    console.log(
      `:: Etapa 06 - Lista das cidades com menor nome por estado: ${result} :: OK`
    );
    console.log(
      `:: Etapa 08 - Lista da cidade com menor nome dentre os estados: ${globalStates[0].city} - ${globalStates[0].state} :: OK`
    );
  } catch (error) {
    console.error(error.message);
  }
};

init();
export default router;
