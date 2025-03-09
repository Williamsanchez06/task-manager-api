import express from "express";
import {
    createTask,
    deleteTask,
    getSharedTasks,
    getTaskById,
    getTasks, shareTask,
    updateTask
} from "../controllers/taskController.js";
import { validateJwtHandler }  from "../middlewares/validateJwtHandler.js";
import validatorHandler from "../middlewares/validatorHandler.js";
import {createTaskSchema, getTaskSchema, shareTaskSchema, updateTaskSchema} from "../schemas/taskSchema.js";
import logger from "../utils/logger.js";

const router = express.Router();

router.use((req, res, next) => {
    logger.info(`Request received: ${req.method} ${req.originalUrl}`);
    next();
});

router.post("/", validateJwtHandler, validatorHandler(createTaskSchema, "body"), createTask);
router.get("/", validateJwtHandler, getTasks);
router.get("/shared", validateJwtHandler, getSharedTasks);
router.get("/:id", validateJwtHandler, validatorHandler(getTaskSchema, "params"), getTaskById);
router.put("/:id", validateJwtHandler, validatorHandler(getTaskSchema, "params"), validatorHandler(updateTaskSchema, "body"), updateTask);
router.delete("/:id", validateJwtHandler, validatorHandler(getTaskSchema, "params"), deleteTask);
router.post("/:id/share", validateJwtHandler, validatorHandler(getTaskSchema, "params"), validatorHandler(shareTaskSchema, "body"), shareTask);

router.use((req, res) => {
    res.status(404).json({ message: "Ruta no encontrada" });
});

router.use((req, res) => {
    res.status(500).json({ message: "Error interno en el servidor" });
});

export default router;

