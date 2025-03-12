import express from "express";
import JwtMiddleware from "../../../core/middlewares/jwtMiddleware.js";
import ValidatorMiddleware from "../../../core/middlewares/validatorMiddleware.js";
import { createTaskSchema, getTaskSchema, shareTaskSchema, updateTaskSchema } from "../validations/taskValidation.js";

export default function taskRouter(taskController) {
    const router = express.Router();

    // Rutas protegidas con JWT
    router.use(JwtMiddleware.validateToken);

    // Rutas de tareas
    router.post("/", ValidatorMiddleware.validate(createTaskSchema, "body"), taskController.createTask);
    router.get("/", taskController.getTasks);
    router.get("/shared", taskController.getSharedTasks);
    router.get("/:id", ValidatorMiddleware.validate(getTaskSchema, "params"), taskController.getTaskById);
    router.put("/:id", ValidatorMiddleware.validate(updateTaskSchema, "body"), taskController.updateTask);
    router.delete("/:id", taskController.deleteTask);
    router.post("/:id/share", ValidatorMiddleware.validate(shareTaskSchema, "body"), taskController.shareTask);

    // Manejo de rutas no encontradas
    router.use((req, res) => {
        res.status(404).json({ message: "Ruta no encontrada" });
    });

    return router;
}
