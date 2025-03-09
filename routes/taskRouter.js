import express from "express";
import {
    createTask,
    deleteTask,
    getSharedTasks,
    getTaskById,
    getTasks, shareTask,
    updateTask
} from "../controllers/taskController.js";
import { validateJWT }  from "../middlewares/validateJwt.js";
import validatorHandler from "../middlewares/validatorHandler.js";
import {createTaskSchema, getTaskSchema, shareTaskSchema, updateTaskSchema} from "../schemas/taskSchema.js";
import logger from "../utils/logger.js";

const router = express.Router();

router.use((req, res, next) => {
    logger.info(`Request received: ${req.method} ${req.originalUrl}`);
    next();
});

router.post("/", validateJWT, validatorHandler(createTaskSchema, "body"), createTask);
router.get("/", validateJWT, getTasks);
router.get("/shared", validateJWT, getSharedTasks);
router.get("/:id", validateJWT, validatorHandler(getTaskSchema, "params"), getTaskById);
router.put("/:id", validateJWT, validatorHandler(getTaskSchema, "params"), validatorHandler(updateTaskSchema, "body"), updateTask);
router.delete("/:id", validateJWT, validatorHandler(getTaskSchema, "params"), deleteTask);
router.post("/:id/share", validateJWT, validatorHandler(getTaskSchema, "params"), validatorHandler(shareTaskSchema, "body"), shareTask);

router.use((req, res) => {
    res.status(404).json({ message: "Ruta no encontrada" });
});

router.use((req, res) => {
    res.status(500).json({ message: "Error interno en el servidor" });
});

export default router;

