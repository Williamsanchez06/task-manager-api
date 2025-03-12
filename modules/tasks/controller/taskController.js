class TaskController {
    constructor(taskService) {
        this.taskService = taskService;

        // Bind para evitar pérdida de contexto
        this.createTask = this.createTask.bind(this);
        this.getTasks = this.getTasks.bind(this);
        this.getSharedTasks = this.getSharedTasks.bind(this);
        this.getTaskById = this.getTaskById.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.shareTask = this.shareTask.bind(this);
    }

    async createTask(req, res, next) {
        try {
            const newTask = await this.taskService.create({ ...req.body, ownerId: req.uuid_user });
            res.status(201).json(newTask);
        } catch (error) {
            next(error);
        }
    }

    async getTasks(req, res, next) {
        try {
            const { page = 1, pageSize = 10, search = "" } = req.query;
            const tasks = await this.taskService.findAll(req.uuid_user, page, pageSize, search);
            res.json(tasks);
        } catch (error) {
            next(error);
        }
    }

    async getSharedTasks(req, res, next) {
        try {
            const { page = 1, pageSize = 10 } = req.query;
            const tasks = await this.taskService.findShared(req.uuid_user, page, pageSize);
            res.json(tasks);
        } catch (error) {
            next(error);
        }
    }

    async getTaskById(req, res, next) {
        try {
            const task = await this.taskService.findOne(req.params.id);
            res.json(task);
        } catch (error) {
            next(error);
        }
    }

    async updateTask(req, res, next) {
        try {
            const updatedTask = await this.taskService.update(req.params.id, req.body);
            res.json(updatedTask);
        } catch (error) {
            next(error);
        }
    }

    async deleteTask(req, res, next) {
        try {
            const result = await this.taskService.delete(req.params.id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async shareTask(req, res, next) {
        try {
            const sharedTask = await this.taskService.shareTask(req.params.id, req.body.sharedUserId);
            res.json(sharedTask);
        } catch (error) {
            next(error);
        }
    }
}

export default TaskController;
