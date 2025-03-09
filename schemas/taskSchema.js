import Joi from "joi";

const id = Joi.string().uuid().messages({
    "string.base": "El id debe ser un texto",
    "string.uuid": "El id debe ser un UUID válido",
    "any.required": "El id es obligatorio"
});

const title = Joi.string().min(3).max(100).messages({
    "string.base": "El título debe ser un texto",
    "string.min": "El título debe tener al menos 3 caracteres",
    "string.max": "El título no debe exceder 100 caracteres",
    "any.required": "El título es obligatorio"
});

const description = Joi.string().max(500).messages({
    "string.base": "La descripción debe ser un texto",
    "string.max": "La descripción no debe exceder 500 caracteres",
    "any.required": "La descripción es obligatoria"
});

const status = Joi.string().valid("pending", "completed").messages({
    "any.only": "El estado debe ser 'pending' o 'completed'",
    "any.required": "El estado es obligatorio"
});

const sharedUserId = Joi.string().uuid().messages({
    "string.base": "El ID del usuario compartido debe ser un texto",
    "string.uuid": "El ID del usuario compartido debe ser un UUID válido",
    "any.required": "El ID del usuario compartido es obligatorio"
});

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
