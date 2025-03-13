import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import setupModels from "./setupModels.js";
import logger from "../logger.js";
import pg from 'pg';

dotenv.config();

class Database {
    constructor() {
        this.setDefaultEnvVariables();
        this.validateEnvVariables();
        this.sequelize = this.createSequelizeInstance();
        this.connected = false;
    }

    setDefaultEnvVariables() {
        process.env.DB_NAME = process.env.DB_NAME || "tasks";
        process.env.DB_USER = process.env.DB_USER || "postgres";
        process.env.DB_PASSWORD = process.env.DB_PASSWORD || "12345";
        process.env.HOST_SQL = process.env.HOST_SQL || "localhost";
        process.env.PORT_SQL = process.env.PORT_SQL || "5432";
    }

    validateEnvVariables() {
        const requiredEnvVars = ["DB_NAME", "DB_USER", "DB_PASSWORD", "HOST_SQL", "PORT_SQL"];
        let missingVars = [];

        requiredEnvVars.forEach((key) => {
            if (!process.env[key]) {
                missingVars.push(key);
            }
        });

        if (missingVars.length > 0) {
            logger.error(`Falta(n) variable(s) de entorno: ${missingVars.join(", ")}`);
        }
    }

    createSequelizeInstance() {
        return new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASSWORD,
            {
                dialect: "postgres",
                host: process.env.HOST_SQL,
                port: Number(process.env.PORT_SQL),
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
                logging: process.env.NODE_ENV === "development" ? console.log : false,
                dialectOptions: process.env.DB_SSL === "true" ? {
                    ssl: { require: true, rejectUnauthorized: false },
                } : {},
                schema: "public",
            }
        );
    }

    async connect() {
        if (this.connected) {
            logger.info("Ya existe una conexión activa a la base de datos.");
            return;
        }
        try {
            await this.sequelize.authenticate();
            logger.info("Conexión exitosa a la base de datos.");
            this.connected = true;
            setupModels.initialize(this.sequelize);
            await this.sequelize.sync();
            logger.info("Modelos sincronizados correctamente.");
        } catch (error) {
            console.log("errror", error);
            logger.error("Error al conectar con la base de datos:", error);
            process.exit(1);
        }
    }

    getInstance() {
        return this.sequelize;
    }
}

const databaseInstance = new Database();
export { databaseInstance };
