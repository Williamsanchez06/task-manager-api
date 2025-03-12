import dotenv from "dotenv";
import app from "./app.js";
import logger from "./core/logger.js";

dotenv.config();

async function startServer() {
  try {
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      logger.info(`Servidor corriendo en el puerto ${PORT}`);
      logger.info(`Entorno: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    logger.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
}

// Iniciar el servidor
startServer();
