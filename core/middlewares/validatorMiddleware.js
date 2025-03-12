import boom from "@hapi/boom";
import logger from "../logger.js";

class ValidatorMiddleware {
  static validate(schema, property) {
    return (req, res, next) => {
      const data = req[property];
      const { error } = schema.validate(data);

      if (error) {
        logger.error("Error en validación", { error });
        return next(boom.badRequest(error));
      }
      next();
    };
  }
}

export default ValidatorMiddleware;
