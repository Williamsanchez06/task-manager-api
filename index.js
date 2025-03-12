import dotenv from 'dotenv';
import app from './app.js'; // Importamos la app ya configurada
import { dbConnection } from './db/db.js';

dotenv.config();

async function initialize() {
  try {
    // Inicializa la base de datos
    await dbConnection();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
      console.log(`Entorno: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('Error durante la inicialización del servidor:', error);
    process.exit(1);
  }
}

initialize();
