import AuthService from "../services/authService.js";
import logger from "../utils/logger.js";

const authService = new AuthService();

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);
        logger.info(`Usuario ${email} autenticado exitosamente.`);
        return res.json({token});
    } catch (error) {
        logger.error("Error en login:", error);
        next(error);
    }
};

export const renewToken = async (req, res, next) => {
    try {
        // Se asume que el middleware de autenticación coloca en req.user el id y el email
        const { uuid_user, email  } = req;
        const token = await authService.renewToken(uuid_user, email);
        logger.info(`Token renovado para el usuario ${email}.`);
        return res.json({ token });

    } catch (error) {
        logger.error("Error al renovar token:", error);
        next(error);
    }
};
