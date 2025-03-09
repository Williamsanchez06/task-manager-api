import boom from "@hapi/boom";

class UserService {
  constructor(db) {
    this.db = db;
  }

  async create(data) {
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
