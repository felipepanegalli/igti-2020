import express from 'express';
const app = express();

import defaultRoutes from './routes/routes.js';

app.use(express.json());
app.use('/', defaultRoutes);

app.listen(3000, () => {
  console.log('Server Started.');
});
