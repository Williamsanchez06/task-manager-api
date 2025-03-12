import { Sequelize, DataTypes, Model } from "sequelize";
import { USER_TABLE } from "../../users/models/userModel.js";

const TASK_TABLE = "tasks";

const TaskSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    title: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    description: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    status: {
        allowNull: false,
        type: DataTypes.ENUM("PENDIENTE", "COMPLETADO"),
        defaultValue: "PENDIENTE",
    },
    ownerId: {
        allowNull: false,
        type: DataTypes.UUID,
        field: "owner_id",
        references: { model: USER_TABLE, key: "id" },
    },
    sharedUserId: {
        allowNull: true,
        type: DataTypes.UUID,
        field: "shared_user_id",
        references: { model: USER_TABLE, key: "id" },
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "created_at",
        defaultValue: Sequelize.NOW,
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "updated_at",
        defaultValue: Sequelize.NOW,
    },
};

class Task extends Model {

    static associate(models) {
        this.belongsTo(models.User, { as: "sharedUser", foreignKey: "sharedUserId" });
        this.belongsTo(models.User, { as: "owner", foreignKey: "ownerId" });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: TASK_TABLE,
            modelName: "Task",
            timestamps: false,
        };
    }
}

export { TASK_TABLE, TaskSchema, Task };
