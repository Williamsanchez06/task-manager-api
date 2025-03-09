import { verifyJWT } from "../utils/jwt.js";
import logger from "../utils/logger.js";

export const validateJwtHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        try {
            const { uuid_user, email } = verifyJWT(token);
            req.uuid_user = uuid_user;
            req.email = email;
            return next();
        } catch (error) {
            logger.error("JWT validation error", error);
            return res.status(403).json({
                statusCode: 403,
                error: "Forbidden",
                message: "Token no válido",
            });
        }
    } else {
        return res.status(403).json({
            statusCode: 403,
            error: "Forbidden",
            message: "Token no válido o inexistente",
        });
    }
};

