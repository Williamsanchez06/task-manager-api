import AuthController from "./controller/authController.js";
import AuthService from "./services/authService.js";
import UserRepository from "../users/repositories/userRepository.js";
import authRoutes from "./routes/authRouter.js";

class AuthModule {
    constructor(app, db) {
        this.app = app;
        this.db = db;
    }

    register() {
        // Inyección de dependencias
        const userRepository = new UserRepository(this.db);
        const authService = new AuthService(userRepository);
        const authController = new AuthController(authService);

        // Registrar las rutas del módulo
        this.app.use("/auth", authRoutes(authController));
    }
}

export default AuthModule;
