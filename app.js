import express from 'express';
import corsMiddleware from './config/cors.js';
import routerApi from './routes/index.js';
import {
    logErrors,
    boomErrorHandler,
    queryOrmErrorHandler,
    generalErrorHandler,
} from './middlewares/errorHandler.js';
import {db} from "./db/db.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(corsMiddleware);

// Rutas
routerApi(app, db);

// Manejo de errores
app.use(logErrors);
app.use(boomErrorHandler);
app.use(queryOrmErrorHandler);
app.use(generalErrorHandler);

export default app;
