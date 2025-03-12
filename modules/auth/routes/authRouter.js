import express from "express";
import JwtMiddleware from "../../../core/middlewares/jwtMiddleware.js";
import ValidatorMiddleware from "../../../core/middlewares/validatorMiddleware.js";
import { loginSchema } from "../validations/authValidation.js";

export default function authRouter(authController) {
    const router = express.Router();

    // Rutas de autenticación
    router.post("/", ValidatorMiddleware.validate(loginSchema, "body"), authController.login);
    router.post("/renew-token", JwtMiddleware.validateToken, authController.renewToken);

    // Manejo de rutas no encontradas en Auth
    router.use((req, res) => {
        res.status(404).json({ message: "Ruta no encontrada" });
    });

    return router;
}
