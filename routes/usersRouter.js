import express from "express";
import validatorHandler from "../middlewares/validatorHandler.js";
import {
  createUserSchema,
  getUserSchema,
} from "../schemas/userSchema.js";
import {
  getUsers,
  getUserId,
  createUser,
} from "../controllers/userController.js";

import logger from "../utils/logger.js";
import {validateJwtHandler} from "../middlewares/validateJwtHandler.js";

const router = express.Router();

router.use((req, res, next) => {
  logger.info(`Request received: ${req.method} ${req.originalUrl}`);
  next();
});

router.get("/", validateJwtHandler, getUsers);

router.get("/:id", validatorHandler(getUserSchema, "params"), validateJwtHandler, getUserId);

router.post("/", validatorHandler(createUserSchema, "body"), createUser);

router.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

export default router;
