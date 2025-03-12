// app.js
import express from "express";
import CoreModule from "./core/coreModule.js";
import routerApi from "./routes/index.js";

const app = express();
app.use(express.json());

// Inicializamos el CoreModule
const core = new CoreModule(app);
await core.initialize();

// Registrar rutas de la API
routerApi(app, core.db.getInstance());

// Registrar los middleware de error al final (después de las rutas)
core.setupErrorHandlers();

export default app;
