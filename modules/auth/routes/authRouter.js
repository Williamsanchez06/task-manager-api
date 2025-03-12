import express from "express";
import validatorHandler from "../../../middlewares/validatorHandler.js";
import logger from "../../../utils/logger.js";
import { validateJwtHandler } from "../../../middlewares/validateJwtHandler.js";
import {loginSchema} from "../validations/authValidation.js";

const router = express.Router();

export default (authController) => {
    router.use((req, res, next) => {
        logger.info(`Request received: ${req.method} ${req.originalUrl}`);
        next();
    });

    router.post("/", validatorHandler(loginSchema, "body"), authController.login);
    router.post("/renew-token", validateJwtHandler, authController.renewToken);

    router.use((req, res) => {
        res.status(404).json({ message: "Ruta no encontrada" });
    });

    return router;
};
