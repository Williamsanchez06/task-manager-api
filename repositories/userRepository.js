class UserRepository {
    constructor(db) {
        this.db = db;
    }

    async createUser(data) {
        return await this.db.models.User.create(data);
    }

    async findAllUsers() {
        return await this.db.models.User.findAll();
    }

    async findUserById(id) {
        return await this.db.models.User.findByPk(id);
    }

    async findUserByEmail(email) {
        return await this.db.models.User.findOne({ where: { email } });
    }
}

export default UserRepository;
