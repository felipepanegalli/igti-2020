import express from 'express';
import db from './models/index.js';
const app = express();

// Conexão com o BD
(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado com sucesso');
  } catch (error) {
    console.log('Erro ao conectar ao banco:\n' + error);
  }
})();

console.clear();

// Routes
import accountsRouter from './routes/accounts.js';

app.use(express.json());
app.use('/accounts', accountsRouter);

app.listen(3001, () => {});
