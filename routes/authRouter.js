import express from "express";
import validatorHandler from "../middlewares/validatorHandler.js";
import {loginSchema} from "../schemas/authSchema.js";
import logger from "../utils/logger.js";
import {login, renewToken} from "../controllers/authController.js";
import {validateJWT} from "../middlewares/validateJwt.js";

const router = express.Router();

router.use((req, res, next) => {
    logger.info(`Request received: ${req.method} ${req.originalUrl}`);
    next();
});

router.post("/", validatorHandler(loginSchema, "body"), login);
router.post("/renewToken", validateJWT, renewToken);

router.use((req, res) => {
    res.status(404).json({ message: "Ruta no encontrada" });
});

export default router;