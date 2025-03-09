import boom from "@hapi/boom";
import logger from "../utils/logger.js";

export default function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data);

    if (error) {
      logger.error("validatorHandler", error);
      next(boom.badRequest(error));
    }
    next();
  };
}
