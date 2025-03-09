import boom from "@hapi/boom";
import { db } from "../db/db.js";

class UserService {
  constructor() {}

  async create(data) {
    const newUser = await db.models.User.create(data);
    return newUser;
  }

  async find() {
    const rta = await db.models.User.findAll({
      include: ["customer"],
    });
    return rta;
  }

  async findOne(id) {
    const usuario = await db.models.User.findByPk(id);

    if (!usuario) {
      throw boom.notFound("Usuario no Encontrado");
    }
    return usuario;
  }

}

export default UserService;
