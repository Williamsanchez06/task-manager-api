import TaskService from "../services/taskService.js";
import logger from "../utils/logger.js";
import { db } from "../db/db.js";

const service = new TaskService(db);

export const createTask = async (req, res, next) => {
    try {
        const newTask = await service.create({ ...req.body, ownerId: req.uuid_user });
        res.status(201).json(newTask);
    } catch (error) {
        logger.error("Error al crear tarea:", error);
        next(error);
    }
};

export const getTasks = async (req, res, next) => {
    try {
        const { page = 1, pageSize = 10, search = "" } = req.query;
        const tasks = await service.findAll(req.uuid_user, page, pageSize, search);
        res.json(tasks);
    } catch (error) {
        logger.error("Error al obtener tareas:", error);
        next(error);
    }
};

export const getSharedTasks = async (req, res, next) => {
    try {
        const { page = 1, pageSize = 10 } = req.query;
        const tasks = await service.findShared(req.uuid_user, page, pageSize);
        res.json(tasks);
    } catch (error) {
        logger.error("Error al obtener tareas compartidas:", error);
        next(error);
    }
};

export const getTaskById = async (req, res, next) => {
    try {
        const task = await service.findOne(req.params.id, req.uuid_user);
        res.json(task);
    } catch (error) {
        logger.error("Error al obtener tarea por ID:", error);
        next(error);
    }
};

export const updateTask = async (req, res, next) => {
    try {
        const updatedTask = await service.update(req.params.id, req.uuid_user, req.body);
        res.json(updatedTask);
    } catch (error) {
        logger.error("Error al actualizar tarea:", error);
        next(error);
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const result = await service.delete(req.params.id, req.uuid_user);
        res.json(result);
    } catch (error) {
        logger.error("Error al eliminar tarea:", error);
        next(error);
    }
};

export const shareTask = async (req, res, next) => {
    try {
        const sharedTask = await service.shareTask(req.params.id, req.uuid_user, req.body.sharedUserId);
        res.json(sharedTask);
    } catch (error) {
        logger.error("Error al compartir tarea:", error);
        next(error);
    }
};