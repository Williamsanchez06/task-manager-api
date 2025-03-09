import UserService from "../services/userService.js";
import logger from "../utils/logger.js";
import bcrypt from "bcrypt";

const service = new UserService();

export const getUsers = async (req, res, next) => {
  try {
    const users = await service.find();
    logger.info('Usuarios obtenidos exitosamente.');
    res.json(users);
  } catch (error) {
    logger.error('Error al obtener usuarios:', error);
    next(error);
  }
};

export const getUserId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.findOne(id);
    logger.info(`Usuario con ID ${id} obtenido exitosamente.`);
    res.json(user);
  } catch (error) {
    logger.error(`Error al obtener el usuario con ID ${id}:`, error);
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const body = req.body;

    // Encriptar la contraseña
    const saltRounds = 10;
    body.password = await bcrypt.hash(body.password, saltRounds);

    const newUser = await service.create(body);
    logger.info('Usuario creado exitosamente.');
    res.json({
        message: 'Usuario creado exitosamente.'
    });

  } catch (error) {
    logger.error('Error al crear usuario:', error);
    next(error);
  }
};