import { generateJWT } from "../../../utils/jwt.js";
import boom from "@hapi/boom";
import { comparePassword } from "../../../utils/bcrypt.js";

class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async login(email, password) {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            throw boom.notFound("Email no encontrado");
        }

        const validPassword = await comparePassword(password, user.password);
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
