import boom from "@hapi/boom";
import TaskRepository from "../repositories/taskRepository.js";

class TaskService {
    constructor(db) {
        this.repository = new TaskRepository(db);
    }

    async create(data) {
        const newTask = await this.repository.createTask(data);
        return newTask;
    }

    async findAll(userId, page = 1, pageSize = 10, search = "") {
        const offset = (page - 1) * pageSize;
        const limit = parseInt(pageSize, 10);
        const whereCondition = this.repository.buildWhereCondition(userId, search);
        const { count, rows } = await this.repository.findAndCountTasks(whereCondition, offset, limit);
        return { tasks: rows, total: count, page, pageSize };
    }

    async findShared(userId, page = 1, pageSize = 10) {
        const offset = (page - 1) * pageSize;
        const limit = parseInt(pageSize, 10);
        const { count, rows } = await this.repository.findAndCountSharedTasks(userId, offset, limit);
        return { tasks: rows, total: count, page, pageSize };
    }

    async findOne(taskId, userId) {
        const task = await this.repository.findTaskById(taskId, userId);
        if (!task) {
            throw boom.notFound("Tarea no encontrada o no tienes permisos para acceder.");
        }
        return task;
    }

    async update(taskId, userId, taskData) {
        const task = await this.repository.findTaskById(taskId, userId);
        if (!task) {
            throw boom.notFound("Tarea no encontrada o no tienes permisos para modificarla.");
        }
        const updatedTask = await this.repository.updateTask(task, taskData);
        return updatedTask;
    }

    async delete(taskId, userId) {
        const task = await this.repository.findTaskById(taskId, userId);
        if (!task) {
            throw boom.notFound("Tarea no encontrada o no tienes permisos para eliminarla.");
        }
        await this.repository.deleteTask(task);
        return { message: "Tarea eliminada correctamente." };
    }

    async shareTask(taskId, ownerId, sharedUserId) {
        const task = await this.repository.findTaskById(taskId, ownerId);
        if (!task) {
            throw boom.notFound("Tarea no encontrada o no tienes permisos para compartirla.");
        }

        const sharedUser = await this.repository.db.models.User.findByPk(sharedUserId);
        if (!sharedUser) {
            throw boom.notFound("Usuario con quien deseas compartir no encontrado.");
        }
        const updatedTask = await this.repository.shareTask(task, sharedUserId);
        return updatedTask;
    }
}

export default TaskService;
