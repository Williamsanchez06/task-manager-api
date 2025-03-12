import express from "express";
import validatorHandler from "../../../middlewares/validatorHandler.js";
import { createTaskSchema, getTaskSchema, shareTaskSchema, updateTaskSchema } from "../validations/taskValidation.js";
import { validateJwtHandler } from "../../../middlewares/validateJwtHandler.js";
import logger from "../../../utils/logger.js";

export default (taskController) => {
    const router = express.Router();

    router.use((req, res, next) => {
        logger.info(`Request received: ${req.method} ${req.originalUrl}`);
        next();
    });

    router.post("/", validateJwtHandler, validatorHandler(createTaskSchema, "body"), taskController.createTask);
    router.get("/", validateJwtHandler, taskController.getTasks);
    router.get("/shared", validateJwtHandler, taskController.getSharedTasks);
    router.get("/:id", validateJwtHandler, validatorHandler(getTaskSchema, "params"), taskController.getTaskById);
    router.put("/:id", validateJwtHandler, validatorHandler(updateTaskSchema, "body"), taskController.updateTask);
    router.delete("/:id", validateJwtHandler, taskController.deleteTask);
    router.post("/:id/share", validateJwtHandler, validatorHandler(shareTaskSchema, "body"), taskController.shareTask);

    return router;
};
