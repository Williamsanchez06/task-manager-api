import { Op, Sequelize } from "sequelize";

class TaskRepository {
    constructor(db) {
        this.db = db;
    }

    async createTask(data) {
        return await this.db.models.Task.create(data);
    }

    buildWhereCondition(userId, search) {
        return {
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
    }

    async findAndCountTasks(whereCondition, offset, limit) {
        return await this.db.models.Task.findAndCountAll({
            where: whereCondition,
            offset,
            limit,
            order: [["createdAt", "DESC"]],
            include: [{ model: this.db.models.User, as: "sharedUser", attributes: ["id","name","email"] }]
        });
    }

    async findTaskById(taskId, ownerId) {
        return await this.db.models.Task.findOne({
            where: { id: taskId, ownerId }
        });
    }

    async updateTask(task, taskData) {
        return await task.update(taskData);
    }

    async deleteTask(task) {
        return await task.destroy();
    }

    async shareTask(task, sharedUserId) {
        task.sharedUserId = sharedUserId;
        return await task.save();
    }

    async findAndCountSharedTasks(userId, offset, limit) {
        return await this.db.models.Task.findAndCountAll({
            where: { sharedUserId: userId },
            offset,
            limit,
            order: [["createdAt", "DESC"]],
            include: [{ model: this.db.models.User, as: "owner", attributes: ["id", "name","email"] }]
        });
    }
}

export default TaskRepository;
