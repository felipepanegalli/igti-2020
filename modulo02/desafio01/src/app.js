import express from 'express';
const app = express();

import gradeRoutes from './routes/grades.js';
import notesRoutes from './routes/notes.js';

app.use(express.json());
app.use('/grades', gradeRoutes);
app.use('/notes', notesRoutes);

app.get('/', (req, res) => {
  res.send('/');
});

app.listen(3000, () => {
  console.log('API Started');
});
