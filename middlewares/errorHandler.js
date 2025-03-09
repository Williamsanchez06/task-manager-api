import { ValidationError } from "sequelize";
import logger from "../utils/logger.js";

export function logErrors(err, req, res, next) {
  logger.error("Error en la ruta " + req.originalUrl, { error: err });
  next(err);
}

export function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    logger.error("Error Boom en " + req.originalUrl, { error: err.output.payload });
    return res.status(err.output.statusCode).json(err.output.payload);
  }
  next(err);
}

export function queryOrmErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    logger.error("Error de validación ORM en " + req.originalUrl, { error: err });
    return res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors,
    });
  }
  next(err);
}

export function generalErrorHandler(err, req, res) {
  logger.error("errorHandler", err);
  return res.status(500).json({
    message: err.message || "Error interno del servidor",
    stack: err.stack,
  });
}