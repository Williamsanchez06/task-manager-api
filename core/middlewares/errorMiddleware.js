import { ValidationError } from "sequelize";
import logger from "../logger.js";

class ErrorMiddleware {
  static logErrors(err, req, res, next) {
    logger.error(`Error en ${req.originalUrl}: ${err.name} - ${err.message}`);
    next(err);
  }

  static boomErrorHandler(err, req, res, next) {
    if (err.isBoom) {
      logger.error(`Error Boom en ${req.originalUrl}`, { error: err.output.payload });
      return res.status(err.output.statusCode).json(err.output.payload);
    }
    next(err);
  }

  static queryOrmErrorHandler(err, req, res, next) {
    if (err instanceof ValidationError || err.name === "SequelizeUniqueConstraintError") {
      const simpleError = {
        name: err.name,
        message: err.parent?.detail || err.message,
      };
      logger.error(`Error de validación ORM en ${req.originalUrl}`, { error: simpleError });
      return res.status(409).json({
        statusCode: 409,
        error: err.name,
        message: simpleError.message,
      });
    }
    next(err);
  }

  static generalErrorHandler(err, req, res, next) {
    logger.error(`Error General en ${req.originalUrl}`, { error: err });
    return res.status(500).json({
      statusCode: 500,
      error: "Internal Server Error",
      message: err.message || "Error interno del servidor",
      stack: err.stack,
    });
  }
}

export default ErrorMiddleware;
