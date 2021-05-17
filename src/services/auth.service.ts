import jwt from 'jsonwebtoken'
import { UserService } from './user.service'
export class AuthService {
    private secretKey: string
    constructor() {
        this.secretKey = 'TheMostSecretKeyEver'
    }

    createToken(data: Object) {
        return jwt.sign(data, this.secretKey)
    }

    isValidToken(token: string) {
        try {
            jwt.verify(token, this.secretKey)
            return true
        } catch (error) {
            return false
        }
    }
}