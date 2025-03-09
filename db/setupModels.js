import { User, UserSchema } from "../models/userModel.js";
import {Task, TaskSchema} from "../models/taskModel.js";

function setupModels(db) {
  User.init(UserSchema, User.config(db));
  Task.init(TaskSchema, Task.config(db));
}

export default setupModels;
