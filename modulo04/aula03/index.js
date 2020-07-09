import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

(async () => {
  try {
    await mongoose.connect(
      `mongodb://${process.env.USERDB}:${process.env.PASSDB}localhost:27017/local`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('Conectado com sucesso');
  } catch (error) {
    console.log('Erro ao conectar ao banco:\n' + error);
  }
})();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Route //');
});

app.listen(process.env.PORT, () => {
  console.log('Servidor em execução');
});
