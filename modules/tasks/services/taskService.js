import boom from "@hapi/boom";

class TaskService {
    constructor(taskRepository) {
        this.repository = taskRepository;
    }

    async create(data) {
        return await this.repository.createTask(data);
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

        return {
            tasks: rows.map(task => {
                return {
                    id: task.id,
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    ownerId: task.ownerId,
                    createdAt: task.createdAt,
                    updatedAt: task.updatedAt,
                    name: task.owner.name,
                    email: task.owner.email
                };
            }),
            total: count,
            page,
            pageSize
        };
    }

    async findOne(taskId) {
        const task = await this.repository.findTaskById(taskId);
        if (!task) throw boom.notFound("Tarea no encontrada o no tienes permisos para acceder.");
        return task;
    }

    async update(taskId, taskData) {
        const task = await this.repository.findTaskById(taskId);
        if (!task) throw boom.notFound("Tarea no encontrada o no tienes permisos para modificarla.");
        return await this.repository.updateTask(task, taskData);
    }

    async delete(taskId) {
        const task = await this.repository.findTaskById(taskId);
        if (!task) throw boom.notFound("Tarea no encontrada o no tienes permisos para eliminarla.");
        await this.repository.deleteTask(task);
        return { message: "Tarea eliminada correctamente." };
    }

    async shareTask(taskId, sharedUserId) {
        const task = await this.repository.findTaskById(taskId);
        if (!task) throw boom.notFound("Tarea no encontrada o no tienes permisos para compartirla.");
        return await this.repository.shareTask(task, sharedUserId);
    }
}

export default TaskService;
