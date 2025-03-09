import boom from "@hapi/boom";
import { encryptPassword } from "../utils/bcrypt.js";
import UserRepository from "../repositories/userRepository.js";

class UserService {
  constructor(db) {
    this.repository = new UserRepository(db);
  }

  async create(data) {

    const existingUser = await this.repository.findUserByEmail(data.email);

    if (existingUser) {
      throw boom.conflict(`Ya existe un usuario con el correo ${data.email}`);
    }

    data.password = await encryptPassword(data.password);
    const newUser = await this.repository.createUser(data);
    return newUser;
  }

  async find() {
    return await this.repository.findAllUsers();
  }

  async findOne(id) {
    const user = await this.repository.findUserById(id);
    if (!user) {
      throw boom.notFound("Usuario no Encontrado");
    }
    return user;
  }
}

export default UserService;
