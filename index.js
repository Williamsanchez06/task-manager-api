import express from 'express';
import dotenv from 'dotenv';
import routerApi from './routes/index.js';
import corsMiddleware from './config/cors.js';
import { dbConnection } from './db/db.js';
import {
  logErrors,
  boomErrorHandler,
  queryOrmErrorHandler,
  generalErrorHandler,
} from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(corsMiddleware);

routerApi(app);

async function initialize() {
  try {
    // Inicializar DB con config
    await dbConnection();

    // Middlewares de manejo de errores
    app.use(logErrors);
    app.use(boomErrorHandler);
    app.use(queryOrmErrorHandler);
    app.use(generalErrorHandler);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
      console.log(`Entorno: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('Error durante la inicialización:', error);
  }
}

initialize();