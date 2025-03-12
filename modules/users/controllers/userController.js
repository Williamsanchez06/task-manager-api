class UserController {
  constructor(userService) {
    this.userService = userService;

    this.getUsers = this.getUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  async getUsers(req, res, next) {
    try {
      const users = await this.userService.find(req.uuid_user);
      res.status(200).json({
        message: "Usuarios obtenidos exitosamente.",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await this.userService.findOne(id);

      res.status(200).json({
        message: "Usuario encontrado.",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      const body = req.body;
      await this.userService.create(body);

      res.status(201).json({
        message: "Usuario creado exitosamente.",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
