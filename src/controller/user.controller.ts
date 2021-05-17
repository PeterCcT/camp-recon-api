import { Request, Response } from "express";
import { UserService } from "../services/user.service";
export class UserController {

    constructor(userService: UserService) {
        this.service = userService
    }

    private service: UserService

    async createUser(req: Request, res: Response) {
        const { body } = req

        const user = await this.service.createUser(body)

        res.send(user)
    }

    async login(req: Request, res: Response) {
        const { body } = req

        const user = await this.service.login(body)

        res.send(user)
    }

}