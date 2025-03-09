import express from 'express';
import dotenv from 'dotenv';
import routerApi from './routes/index.js';
import corsMiddleware from './config/cors.js';
import { dbConnection } from './db/db.js';
import {
  logErrors,
  errorHandler,
  boomErrorHandler,
  queryOrmErrorHandler,
} from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(corsMiddleware);

routerApi(app);

async function initialize() {
  try {
    await dbConnection();

    app.use(logErrors);
    app.use(queryOrmErrorHandler);
    app.use(boomErrorHandler);
    app.use(errorHandler);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error durante la inicialización:', error);
  }
}

initialize();