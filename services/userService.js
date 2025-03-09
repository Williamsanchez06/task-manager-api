import boom from "@hapi/boom";
import bcrypt from "bcrypt";

class UserService {
  constructor(db) {
    this.db = db;
  }

  async create(data) {

    const saltRounds = 10;
    data.password = await bcrypt.hash(data.password, saltRounds);

    const newUser = await this.db.models.User.create(data);
    return newUser;
  }

  async find() {
    const rta = await this.db.models.User.findAll();
    return rta;
  }

  async findOne(id) {
    const user = await this.db.models.User.findByPk(id);

    if (!user) {
      throw boom.notFound("Usuario no Encontrado");
    }
    return user;
  }

}

export default UserService;
