import { response } from "express";
import jwt from "jsonwebtoken";


export const validateJWT = async (req, res = response, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const { uuid_user, email } = jwt.verify(token, process.env.SECRET_JWT_SEED);
            req.uuid_user = uuid_user;
            req.email = email;
            return next();
        } catch (error) {
            const e = new Error('Token no valido');
            return res.status(403).json({ msg: e.message });
        }
    }
    if (!token) {
        const error = new Error('Token no valido o Inexistente');
        return res.status(403).json({ msg: error.message });
    }
    next();
};
