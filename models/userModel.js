import { Sequelize, DataTypes, Model } from "sequelize";

const USER_TABLE = "users";

const UserSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "created_at",
        defaultValue: Sequelize.NOW,
    },
};

class User extends Model {
    static associate(models) {
        this.hasMany(models.Task, { as: "tasksOwned", foreignKey: "ownerId" });
        this.hasMany(models.Task, { as: "tasksShared", foreignKey: "sharedUserId" });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: "User",
            timestamps: false,
        };
    }
}

export { USER_TABLE, UserSchema, User };
