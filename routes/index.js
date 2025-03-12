import express from "express";
import UserModule from "../modules/users/userModule.js";
import AuthModule from "../modules/auth/authModule.js";
import TaskModule from "../modules/tasks/taskModule.js";

export default function routerApi(app, db) {

  const router = express.Router();
  app.use("/api/v1", router);

  const userModule = new UserModule(router, db);
  userModule.register();

  const authModule = new AuthModule(router, db);
  authModule.register();

  const taskModule = new TaskModule(router, db);
  taskModule.register();

}
