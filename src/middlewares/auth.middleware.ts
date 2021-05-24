import { Request, Response, NextFunction } from "express"
import { DefaultError } from "../errors/errors"
import { AuthService } from "../services/auth.service"

export class AuthMiddleware {
    constructor(authService: AuthService) {
        this.authService = authService
    }
    private authService: AuthService
    checkToken(req: Request, res: Response, next: NextFunction) {
        const authorization = req.header('Authorization')
        if (authorization == undefined || !authorization) {
            const error = new DefaultError(
                400,
                'Authorization',
                'Missing "Authorization" header',
                'MissingValueError'
            )
            return res.status(error.status).send(error.toJson())
        }
        if (!authorization.match('Bearer')) {
            const error = new DefaultError(
                400,
                'Authorization',
                'Missing "Bearer" in "Authorization" header',
                'MissingValueError'
            )
            return res.status(error.status).send(error.toJson())
        }
        const token = authorization.replace('Bearer', '').trim()
        if (!token) {
            const error = new DefaultError(
                400,
                'Authorization',
                'Missing token in "Authorization" header',
                'MissingValueError'
            )
            return res.status(error.status).send(error.toJson())
        }
        if (this.authService.isValidToken(token)) {
            return next()
        }
        else {
            return res.status(403).send()
        }
    }
}