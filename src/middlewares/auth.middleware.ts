import { Request, Response, NextFunction } from "express"
import { AuthService } from "../services/auth.service"

export class AuthMiddleware {
    constructor(authService: AuthService) {
        this.authService = authService
    }
    private authService: AuthService
    checkToken(req: Request, res: Response, next: NextFunction) {
        const authorization = req.header('Authorization')
        if (authorization == undefined || !authorization)
            return res.status(400).send({
                'error': 'Missing "Authorization" header'
            })
        if (!authorization.match('Bearer'))
            return res.status(400).send({
                'error': 'Missing "Bearer" in "Authorization" header'
            })
        const token = authorization.replace('Bearer', '').trim()
        if (!token)
            return res.status(400).send({
                'error': 'Missing token in "Authorization" header'
            })
        if (this.authService.isValidToken(token))
            return next()
        else
            return res.status(403).send({
                'error': 'Unathorizated'
            })
    }
}