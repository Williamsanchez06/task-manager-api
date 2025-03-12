// coreModule.js
import corsMiddleware from "./config/cors.js";
import { databaseInstance } from "./config/db.js";
import logger from "./logger.js";
import LoggingMiddleware from "./middlewares/logginMiddleware.js";
import ErrorMiddleware from "./middlewares/errorMiddleware.js";

class CoreModule {
    constructor(app) {
        this.app = app;
        this.db = databaseInstance; // Singleton exportado
    }

    async initialize() {
        this.setupCors();
        await this.setupDatabase();
        this.setupMiddlewares();
        logger.info("CoreModule cargado correctamente.");
    }

    setupCors() {
        this.app.use(corsMiddleware);
        logger.info("CORS configurado correctamente.");
    }

    async setupDatabase() {
        await this.db.connect();
        logger.info("Conexión a la base de datos establecida.");
    }

    setupMiddlewares() {
        this.app.use(LoggingMiddleware.logRequests);
        logger.info("Middlewares configurados correctamente.");
    }

    setupErrorHandlers() {
        this.app.use(ErrorMiddleware.logErrors);
        this.app.use(ErrorMiddleware.boomErrorHandler);
        this.app.use(ErrorMiddleware.queryOrmErrorHandler);
        this.app.use(ErrorMiddleware.generalErrorHandler);
        logger.info("Manejo de errores configurado.");
    }
}

export default CoreModule;
