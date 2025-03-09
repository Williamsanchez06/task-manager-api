import UserService from "../services/userService.js";
import { db } from "../db/db.js";

const service = new UserService(db);

export const getUsers = async (req, res, next) => {
  try {
    const users = await service.find();
    res.status(200).json({
      message: "Usuarios obtenidos exitosamente.",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.findOne(id);

    res.status(200).json({
      message: "Usuario encontrado.",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const body = req.body;

    const newUser = await service.create(body);

    res.status(201).json({
      message: "Usuario creado exitosamente."
    });

  } catch (error) {
    next(error);
  }
};
