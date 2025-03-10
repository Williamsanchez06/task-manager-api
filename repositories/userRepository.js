class UserRepository {
    constructor(db) {
        this.db = db;
    }

    async createUser(data) {
        return await this.db.models.User.create(data);
    }

    async findAllUsers(userId) {
        return await this.db.models.User.findAll({
            where: {
                id: { [this.db.Sequelize.Op.ne]: userId } // Filtra usuarios donde el id sea diferente al usuario autenticado
            }
        });
    }


    async findUserById(id) {
        return await this.db.models.User.findByPk(id);
    }

    async findUserByEmail(email) {
        return await this.db.models.User.findOne({ where: { email } });
    }
}

export default UserRepository;
