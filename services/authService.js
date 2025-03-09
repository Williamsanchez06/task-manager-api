import bcrypt from "bcrypt";
import {generateJWT} from "../utils/jwt.js";
import boom from "@hapi/boom";
import { db } from "../db/db.js";

class AuthService {
    async login(email, password) {
        const user = await db.models.User.findOne({ where: { email } });
        if (!user) {
            throw boom.notFound("Email no encontrado");
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            throw boom.unauthorized("Contraseña no válida");
        }

        return generateJWT(user.id, user.email);
    }

    async renewToken(id, email) {
        return generateJWT(id, email);
    }
}

export default AuthService;
