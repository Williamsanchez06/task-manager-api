import { User, UserSchema } from "../../modules/users/models/userModel.js";
import { Task, TaskSchema } from "../../modules/tasks/models/taskModel.js";

class ModelSetup {
  static initialize(db) {
    User.init(UserSchema, User.config(db));
    Task.init(TaskSchema, Task.config(db));

    User.associate(db.models);
    Task.associate(db.models);
  }
}

export default ModelSetup;
