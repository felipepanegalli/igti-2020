import express from 'express';
import { promises } from 'fs';
import database from '../configs/database.config.js';
const router = express.Router();
const writeFile = promises.writeFile;
const readFile = promises.readFile;

router.get('/', async (req, res) => {
  try {
    let file = await readFile(database.grades, 'utf-8');
    let data = await JSON.parse(file);
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  let { student, subject, type, value } = req.body;
  const timestamp = new Date();
  try {
    let file = await readFile(database.grades, 'utf-8');
    let data = await JSON.parse(file);
    let grade = {
      id: data.nextId++,
      student,
      subject,
      type,
      value,
      timestamp: timestamp,
    };
    data.grades.push(grade);
    await writeFile(database.grades, JSON.stringify(data));
    res.status(201).json(grade);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/', async (req, res) => {
  const { id, student, subject, type, value } = req.body;
  try {
    let file = await readFile(database.grades, 'utf-8');
    let data = await JSON.parse(file);
    let oldIndex = data.grades.findIndex((grade) => grade.id === parseInt(id));
    if (oldIndex < 0)
      return res.status(404).send({ error: 'Grade not found!' });
    data.grades[oldIndex].student = student;
    data.grades[oldIndex].subject = subject;
    data.grades[oldIndex].type = type;
    data.grades[oldIndex].value = value;
    await writeFile(database.grades, JSON.stringify(data));
    res.end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id/', async (req, res) => {
  const { id } = req.params;
  try {
    let file = await readFile(database.grades, 'utf-8');
    let data = await JSON.parse(file);
    const grade = data.grades.filter((grade) => grade.id !== parseInt(id));
    data.grades = grade;
    await writeFile(database.grades, JSON.stringify(data));
    res.end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id/', async (req, res) => {
  const { id } = req.params;
  try {
    let file = await readFile(database.grades, 'utf-8');
    let data = await JSON.parse(file);
    const grade = data.grades.filter((grade) => grade.id === parseInt(id));
    data.grades = grade;
    res.send(grade);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
