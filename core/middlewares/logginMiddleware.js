import logger from "../logger.js";

class LoggingMiddleware {
    static logRequests(req, res, next) {
        logger.info(`[${req.method}] ${req.originalUrl}`);
        next();
    }
}

export default LoggingMiddleware;
