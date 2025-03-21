import cors from "cors";

class CorsConfig {
    constructor() {
        this.whiteList = process.env.CORS_WHITELIST
            ? process.env.CORS_WHITELIST.split(",")
            : ["http://localhost:4200"];
        this.options = {
            origin: this.validateOrigin.bind(this),
        };
    }

    validateOrigin(origin, callback) {
        if (this.whiteList.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error("No Permitido"));
        }
    }

    getMiddleware() {
        return cors(this.options);
    }
}

export default new CorsConfig().getMiddleware();
