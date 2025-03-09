import boom from "@hapi/boom";
import { db } from "../db/db.js";

class UserService {
  constructor() {}

  async create(data) {
    const newUser = await db.models.User.create(data);
    return newUser;
  }

  async find() {
    const rta = await db.models.User.findAll();
    return rta;
  }

  async findOne(id) {
    const user = await db.models.User.findByPk(id);

    if (!user) {
      throw boom.notFound("Usuario no Encontrado");
    }
    return user;
  }

}

export default UserService;
