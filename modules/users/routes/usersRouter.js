import { Router } from "express";
import validatorHandler from "../../../middlewares/validatorHandler.js";
import { createUserSchema, getUserSchema } from "../validations/userValidation.js";
import logger from "../../../utils/logger.js";
import { validateJwtHandler } from "../../../middlewares/validateJwtHandler.js";

export default (userController) => {
  const router = Router();

  router.use((req, res, next) => {
    logger.info(`Request received: ${req.method} ${req.originalUrl}`);
    next();
  });

  router.get("/", validateJwtHandler, userController.getUsers);
  router.get("/:id", validatorHandler(getUserSchema, "params"), validateJwtHandler, userController.getUserById);
  router.post("/", validatorHandler(createUserSchema, "body"), userController.createUser);

  router.use((req, res) => {
    res.status(404).json({ message: "Not Found" });
  });

  return router;
};
