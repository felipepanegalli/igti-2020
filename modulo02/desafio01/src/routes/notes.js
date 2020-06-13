import express from 'express';
import { promises } from 'fs';
import database from '../configs/database.config.js';
const router = express.Router();
const writeFile = promises.writeFile;
const readFile = promises.readFile;

router.get('/', async (req, res) => {
  const { student, subject } = req.body;
  try {
    let file = await readFile(database.grades, 'utf-8');
    let data = await JSON.parse(file);

    const grades = data.grades.filter(
      (grade) => grade.student === student && grade.subject === subject
    );

    const total = grades.reduce((acc, curr) => acc + curr.value, 0);

    res.send({ grades: grades, totalValue: total });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/type', async (req, res) => {
  const { type, subject } = req.body;
  try {
    let file = await readFile(database.grades, 'utf-8');
    let data = await JSON.parse(file);
    const grades = data.grades.filter(
      (grade) => grade.type === type && grade.subject === subject
    );
    const qtd = Object.keys(grades).length;
    const total = grades.reduce((acc, curr) => acc + curr.value, 0);
    res.send({ grades: grades, avgValue: total / qtd });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/best', async (req, res) => {
  const { type, subject } = req.body;
  try {
    let file = await readFile(database.grades, 'utf-8');
    let data = await JSON.parse(file);
    let grades = data.grades.filter(
      (grade) => grade.type === type && grade.subject === subject
    );
    grades.sort((a, b) => b.value - a.value);
    grades = Object.entries(grades)
      .slice(0, 3)
      .map((grade) => grade[1]);

    res.send(grades);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
