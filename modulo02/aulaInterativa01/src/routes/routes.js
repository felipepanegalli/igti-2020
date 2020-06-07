import express from 'express';
const router = express.Router();
import { promises } from 'fs';
const { readFile, writeFile } = promises;

const times = [];

// Rota que lê o json e gera tabela do campeonato
router.get('/', async (req, res) => {
  const file = await readFile('./src/database/2003.json', 'utf-8');
  const data = await JSON.parse(file);

  // Montando o array de times
  data[0].partidas.forEach((partida) => {
    times.push({ time: partida.mandante, pontuacao: 0 });
    times.push({ time: partida.visitante, pontuacao: 0 });
  });

  // Montando pontuação dos times no array
  data.forEach((rodada) => {
    rodada.partidas.forEach((partida) => {
      const indexVisitante = times.findIndex(
        (item) => item.time === partida.visitante
      );

      const indexMandante = times.findIndex(
        (item) => item.time === partida.mandante
      );

      let timeVisitante = times[indexVisitante];
      let timemandante = times[indexMandante];

      if (partida.placar_visitante > partida.placar_mandante) {
        timeVisitante.pontuacao += 3;
        times[indexVisitante] = timeVisitante;
      } else if (partida.placar_mandante > partida.placar_visitante) {
        timemandante.pontuacao += 3;
        times[indexMandante] = timemandante;
      } else {
        timeVisitante.pontuacao += 1;
        timemandante.pontuacao += 1;
        times[indexVisitante] = timeVisitante;
        times[indexMandante] = timemandante;
      }
    });
  });

  await writeFile('./src/database/ranking.json', JSON.stringify(times));

  res.end();
});

// Rota que lê o json de ranking gerado e exibe na tela
router.get('/ranking', async (req, res) => {
  const file = await readFile('./src/database/ranking.json', 'utf-8');
  const data = await JSON.parse(file);
  // Ordenar time de acordo com a pontuação
  data.sort((a, b) => b.pontuacao - a.pontuacao);
  console.log(data);
  res.send(data);
});

// Rota que lê o json de ranking e exibe o campeão em tela
router.get('/campeao', async (req, res) => {
  const file = await readFile('./src/database/ranking.json', 'utf-8');
  const data = await JSON.parse(file);
  // Ordenar time de acordo com a pontuação
  data.sort((a, b) => b.pontuacao - a.pontuacao);
  res.send(data[0]);
});

export default router;
