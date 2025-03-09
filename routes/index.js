import express from "express";
import usersRouter from "./usersRouter.js";
import authRouter from "./authRouter.js";

export default function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/users", usersRouter);
  router.use("/auth", authRouter);
}
