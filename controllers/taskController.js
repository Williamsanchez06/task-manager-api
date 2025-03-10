import TaskService from "../services/taskService.js";
import { db } from "../db/db.js";

const service = new TaskService(db);

export const createTask = async (req, res, next) => {
    try {
        const newTask = await service.create({ ...req.body, ownerId: req.uuid_user });
        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
};

export const getTasks = async (req, res, next) => {
    try {
        const { page = 1, pageSize = 10, search = "" } = req.query;
        const tasks = await service.findAll(req.uuid_user, page, pageSize, search);
        res.json(tasks);
    } catch (error) {
        next(error);
    }
};

export const getSharedTasks = async (req, res, next) => {
    try {
        const { page = 1, pageSize = 10 } = req.query;
        const tasks = await service.findShared(req.uuid_user, page, pageSize);
        res.json(tasks);
    } catch (error) {
        next(error);
    }
};

export const getTaskById = async (req, res, next) => {
    try {
        const task = await service.findOne(req.params.id);
        res.json(task);
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (req, res, next) => {
    try {
        const updatedTask = await service.update(req.params.id, req.body);
        res.json(updatedTask);
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const result = await service.delete(req.params.id);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const shareTask = async (req, res, next) => {
    try {
        const sharedTask = await service.shareTask(req.params.id, req.body.sharedUserId);
        res.json(sharedTask);
    } catch (error) {
        next(error);
    }
};