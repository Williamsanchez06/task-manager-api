import { User, UserSchema } from "../models/userModel.js";
import {Task, TaskSchema} from "../models/taskModel.js";

function setupModels(db) {

  User.init(UserSchema, User.config(db));
  Task.init(TaskSchema, Task.config(db));

  User.associate(db.models);
  Task.associate(db.models);

}

export default setupModels;
