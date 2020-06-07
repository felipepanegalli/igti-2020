import express from 'express';
const app = express();

import defaultRouter from './routes/routes.js';

app.use(express.json());
app.use('/times', defaultRouter);

app.listen(3000, () => {
  console.log('Api started.');
});
