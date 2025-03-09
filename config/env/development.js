import dotenv from 'dotenv';

dotenv.config();

const developmentConfig = {
    db: {
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.HOST_SQL,
        port: process.env.PORT_SQL,
        ssl: process.env.DB_SSL,
    },
    server: {
        port: process.env.PORT || 3000,
    },
};

export default developmentConfig;