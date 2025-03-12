import TaskController from "./controller/taskController.js";
import TaskService from "./services/taskService.js";
import TaskRepository from "./repositories/taskRepository.js";
import taskRoutes from "./routes/taskRouter.js";

class TaskModule {
    constructor(app, db) {
        this.app = app;
        this.db = db;
    }

    register() {
        // Inyección de dependencias
        const taskRepository = new TaskRepository(this.db);
        const taskService = new TaskService(taskRepository);
        const taskController = new TaskController(taskService);

        // Registrar las rutas del módulo
        this.app.use("/tasks", taskRoutes(taskController));
    }
}

export default TaskModule;
