import AuthService from "../services/authService.js";
import { db } from "../db/db.js";

const authService = new AuthService(db);

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);
        return res.status(200).json({
            message: "Login exitoso",
            token,
        });
    } catch (error) {
        next(error);
    }
};

export const renewToken = async (req, res, next) => {
    try {
        // Se asume que el middleware de autenticación coloca en req el uuid_user y el email
        const { uuid_user, email } = req;
        const token = await authService.renewToken(uuid_user, email);
        return res.status(200).json({
            message: "Token renovado exitosamente",
            token,
        });
    } catch (error) {
        next(error);
    }
};
