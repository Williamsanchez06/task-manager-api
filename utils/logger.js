import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const transportConsole = new winston.transports.Console();

const transportErrorFile = new DailyRotateFile({
    filename: 'logs/%DATE%/error.log',
    datePattern: 'YYYY-MM-DD',
    level: 'error',
    zippedArchive: true,
    maxFiles: '30d'
});

const transportCombinedFile = new DailyRotateFile({
    filename: 'logs/%DATE%/combined.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxFiles: '30d'
});

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        transportConsole,
        transportErrorFile,
        transportCombinedFile
    ],
});

export default logger;

