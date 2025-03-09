import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import setupModels from './setupModels.js';
import logger from '../utils/logger.js';

dotenv.config();

const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.HOST_SQL,
        port: process.env.PORT_SQL,
        define: {
            timestamps: false,
            freezeTableName: true,
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        logging: false,
        dialectOptions: {
            ssl: process.env.DB_SSL === 'true' ? { require: true, rejectUnauthorized: false } : false,
        },
        schema: 'public',
    }
);

const dbConnection = async () => {
    try {
        await db.authenticate();
        logger.info('Conexión exitosa a la base de datos.');
    } catch (error) {
        logger.error('Error al conectar con la base de datos:', error);
    }
};

setupModels(db);
db.sync();

export { dbConnection, db };