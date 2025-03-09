import { ValidationError } from "sequelize";
import logger from "../utils/logger.js";

export function logErrors(err, req, res, next) {
  logger.error("logErrors", err);
  next(err);
}

export function errorHandler(err, req, res) {
  logger.error("errorHandler", err);
  return res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

export function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    logger.error("boomErrorHandler", output.payload);
    return res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

export function queryOrmErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    logger.error("queryOrmErrorHandler", err);
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors,
    });
  }
  next(err);
}
