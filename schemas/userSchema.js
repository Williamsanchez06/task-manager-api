import Joi from "joi";

const id = Joi.string().uuid().messages({
  "string.base": "El id debe ser un texto",
  "string.uuid": "El id debe ser un UUID válido",
  "any.required": "El id es obligatorio"
});

const email = Joi.string().email().messages({
  "string.email": "El correo debe tener un formato válido",
  "any.required": "El correo es obligatorio"
});

const password = Joi.string().min(8).messages({
  "string.min": "La contraseña debe tener al menos 8 caracteres",
  "any.required": "La contraseña es obligatoria"
});

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required()
});

const updateUserSchema = Joi.object({
  email: email
});

const getUserSchema = Joi.object({
  id: id.required()
});

export { createUserSchema, updateUserSchema, getUserSchema };
