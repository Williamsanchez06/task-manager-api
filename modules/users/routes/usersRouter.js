import express from "express";
import JwtMiddleware from "../../../core/middlewares/jwtMiddleware.js";
import ValidatorMiddleware from "../../../core/middlewares/validatorMiddleware.js";
import { createUserSchema, getUserSchema } from "../validations/userValidation.js";

export default function userRouter(userController) {
  const router = express.Router();

  //Rutas sin token
  router.post("/", ValidatorMiddleware.validate(createUserSchema, "body"), userController.createUser);

  // Aplicar protección con JWT en todas las demás rutas
  router.use(JwtMiddleware.validateToken);

  //Rutas protegidas con autenticación
  router.get("/", userController.getUsers);
  router.get("/:id", ValidatorMiddleware.validate(getUserSchema, "params"), userController.getUserById);

  //Manejo de rutas no encontradas
  router.use((req, res) => {
      res.status(404).json({ message: "Ruta no encontrada" });
  });
  return router;
}
