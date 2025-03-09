import boom from "@hapi/boom";
import { Op, Sequelize } from "sequelize";

class TaskService {
    constructor(db) {
        this.db = db;
    }

    async create(data) {
        const newTask = await this.db.models.Task.create(data);
        return newTask;
    }

    async findAll(userId, page = 1, pageSize = 10, search = "") {
        const offset = (page - 1) * pageSize;
        const limit = parseInt(pageSize);

        const whereCondition = {
            ownerId: userId,
            ...(search && {
                [Op.or]: [
                    { title: { [Op.iLike]: `%${search}%` } },
                    Sequelize.where(
                        Sequelize.cast(Sequelize.col("Task.status"), "text"),
                        { [Op.iLike]: `%${search}%` }
                    )
                ]
            })
        };

        const { count, rows } = await this.db.models.Task.findAndCountAll({
            where: whereCondition,
            offset,
            limit,
            order: [["createdAt", "DESC"]],
            include: [{ model: this.db.models.User, as: "sharedUser", attributes: ["id", "email"] }],
        });

        return { tasks: rows, total: count, page, pageSize };
    }

    async findShared(userId, page = 1, pageSize = 10) {
        const offset = (page - 1) * pageSize;
        const limit = parseInt(pageSize);

        const { count, rows } = await this.db.models.Task.findAndCountAll({
            where: { sharedUserId: userId },
            offset,
            limit,
            order: [["createdAt", "DESC"]],
            include: [{ model: this.db.models.User, as: "owner", attributes: ["id", "email"] }],
        });

        return { tasks: rows, total: count, page, pageSize };
    }

    async findOne(taskId, userId) {
        const task = await this.db.models.Task.findOne({
            where: { id: taskId, ownerId: userId },
        });

        if (!task) {
            throw boom.notFound("Tarea no encontrada o no tienes permisos para acceder.");
        }

        return task;
    }

    async update(taskId, userId, taskData) {
        const task = await this.db.models.Task.findOne({
            where: { id: taskId, ownerId: userId },
        });

        if (!task) {
            throw boom.notFound("Tarea no encontrada o no tienes permisos para modificarla.");
        }

        await task.update(taskData);
        return task;
    }

    async delete(taskId, userId) {
        const task = await this.db.models.Task.findOne({
            where: { id: taskId, ownerId: userId },
        });

        if (!task) {
            throw boom.notFound("Tarea no encontrada o no tienes permisos para eliminarla.");
        }

        await task.destroy();
        return { message: "Tarea eliminada correctamente." };
    }

    async shareTask(taskId, ownerId, sharedUserId) {
        const task = await this.db.models.Task.findOne({
            where: { id: taskId, ownerId },
        });

        if (!task) {
            throw boom.notFound("Tarea no encontrada o no tienes permisos para compartirla.");
        }

        const sharedUser = await this.db.models.User.findByPk(sharedUserId);
        if (!sharedUser) {
            throw boom.notFound("Usuario con quien deseas compartir no encontrado.");
        }

        task.sharedUserId = sharedUserId;
        await task.save();

        return task;
    }
}

export default TaskService;