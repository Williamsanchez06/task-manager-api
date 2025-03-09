import Joi from "joi";

const id = Joi.string().uuid();
const title = Joi.string().min(3).max(100);
const description = Joi.string().max(500);
const status = Joi.string().valid("pending", "completed");
const sharedUserId = Joi.string().uuid();

// Esquema para crear una nueva tarea
const createTaskSchema = Joi.object({
    title: title.required(),
    description: description.required(),
    status: status.required(),
});

// Esquema para actualizar una tarea existente
const updateTaskSchema = Joi.object({
    title: title,
    description: description,
    status: status,
});

// Esquema para obtener una tarea por ID
const getTaskSchema = Joi.object({
    id: id.required(),
});

// Esquema para compartir una tarea con otro usuario
const shareTaskSchema = Joi.object({
    sharedUserId: sharedUserId.required(),
});

export { createTaskSchema, updateTaskSchema, getTaskSchema, shareTaskSchema };
