import jwt from 'jsonwebtoken';

export const generateJWT = ( uuid_user, email) => {
    const payload = { uuid_user, email };

    return jwt.sign(payload, process.env.SECRET_JWT_SEED || "clave-secreta-por-defecto", {
        expiresIn: process.env.JWT_EXPIRES_IN || "30d"
    });

};

export const verifyJWT = (token) => {
    return jwt.verify(token, process.env.SECRET_JWT_SEED);
};