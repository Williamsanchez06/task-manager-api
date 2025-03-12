import boom from "@hapi/boom";
import { encryptPassword } from "../../../utils/bcrypt.js";

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async create(data) {
    const existingUser = await this.userRepository.findUserByEmail(data.email);

    if (existingUser) {
      throw boom.conflict(`Ya existe un usuario con el correo ${data.email}`);
    }

    data.password = await encryptPassword(data.password);
    const newUser = await this.userRepository.createUser(data);
    return newUser;
  }

  async find(userId) {
    return await this.userRepository.findAllUsers(userId);
  }

  async findOne(id) {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw boom.notFound("Usuario no encontrado");
    }
    return user;
  }
}

export default UserService;
