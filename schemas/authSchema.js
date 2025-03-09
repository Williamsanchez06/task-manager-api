import Joi from "joi";

const email = Joi.string().email().messages({
    'string.email': 'El correo debe tener un formato válido',
    'any.required': 'El correo es obligatorio'
});

const password = Joi.string().min(8).messages({
    'string.min': 'La contraseña debe tener al menos 8 caracteres',
    'any.required': 'La contraseña es obligatoria'
});

const loginSchema = Joi.object({
    email: email.required(),
    password: password.required()
});

export { loginSchema };
