import { Request, Response } from "express";
import { UserService } from "../services/user.service";
export class UserController {

    constructor(userService: UserService) {
        this.service = userService
    }

    private service: UserService

    async createUser(req: Request, res: Response) {
        const { body } = req

        const {
            containsError,
            user,
            err
        } = await this.service.createUser(body)

        if (containsError)
            res.status(err.status).send(err.toJson())
        else
            res.send(user)
    }

    async getUser(req: Request, res: Response) {
        const { id } = req.params

        const { containsError, user, err } = await this.service.getOneUser(id);

        if (containsError)
            res.status(err.status).send(err.toJson())
        else
            res.send(user)
    }

    async getUsers(req: Request, res: Response) {
        const { query } = req

        const {
            containsError,
            users,
            err
        } = await this.service.getUsers(query)

        if (containsError)
            res.status(err.status).send(err.toJson())
        else
            res.send(users)

    }

    async getFavorites(req: Request, res: Response) {
        const {
            containsError,
            users,
            err
        } = await this.service.getFavorites()

        if (containsError)
            res.status(err.status).send(err.toJson())
        else
            res.send(users)
    }

    async login(req: Request, res: Response) {
        const { body } = req

        const result = await this.service.login(body)
        if (result.containsError) {
            res.status(result.err.status).send(result.err.toJson())
        } else {
            res.send(result.user)
        }
    }
}
