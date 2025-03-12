import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

class Logger {
    constructor() {
        this.logger = winston.createLogger({
            level: "info",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            transports: [
                new winston.transports.Console(),
                new DailyRotateFile({
                    filename: "logs/%DATE%/error.log",
                    datePattern: "YYYY-MM-DD",
                    level: "error",
                    zippedArchive: true,
                    maxFiles: "30d",
                }),
                new DailyRotateFile({
                    filename: "logs/%DATE%/combined.log",
                    datePattern: "YYYY-MM-DD",
                    zippedArchive: true,
                    maxFiles: "30d",
                }),
            ],
        });
    }

    info(message) {
        this.logger.info(message);
    }

    error(message) {
        this.logger.error(message);
    }

    getInstance() {
        return this.logger;
    }
}

export default new Logger();
