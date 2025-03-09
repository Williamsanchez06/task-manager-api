import jwt from 'jsonwebtoken';

export const generateJWT = ( uuid_user, email) => {
    const payload = { uuid_user, email };

    return jwt.sign( payload, process.env.SECRET_JWT_SEED, {
        expiresIn: "30d"
    });

};