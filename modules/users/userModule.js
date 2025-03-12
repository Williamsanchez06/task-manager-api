import UserController from "./controllers/userController.js";
import UserService from "./services/userService.js";
import UserRepository from "./repositories/userRepository.js";
import userRoutes from "./routes/usersRouter.js";

class UserModule {
    constructor(app, db) {
        this.app = app;
        this.db = db;
    }

    register() {
        // Inyección de dependencias
        const userRepository = new UserRepository(this.db);
        const userService = new UserService(userRepository);
        const userController = new UserController(userService);

        // Configurar las rutas del módulo
        this.app.use("/users", userRoutes(userController));
    }
}

export default UserModule;
