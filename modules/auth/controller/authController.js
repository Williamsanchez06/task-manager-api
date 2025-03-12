class AuthController {
    constructor(authService) {
        this.authService = authService;

        // Bind para mantener contexto
        this.login = this.login.bind(this);
        this.renewToken = this.renewToken.bind(this);
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const token = await this.authService.login(email, password);
            return res.status(200).json({
                message: "Login exitoso",
                token,
            });
        } catch (error) {
            next(error);
        }
    }

    async renewToken(req, res, next) {
        try {
            const { uuid_user, email } = req;
            const token = await this.authService.renewToken(uuid_user, email);
            return res.status(200).json({
                message: "Token renovado exitosamente",
                token,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default AuthController;
