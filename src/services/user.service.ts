import { FindOneOptions } from "typeorm";
import { INewUser, User, UserRelations } from "../models/user.model";
import { UserRepositorie } from "../repositories/user.repositorie";
import { AchievementService } from "./achievement.service";
import { AuthService } from "./auth.service";
import { CategorieService } from "./categorie.service";
import { HashingService } from "./hashing.service";

interface IFilterData {
    field: (keyof User),
    value: string
}

export class UserService {

    constructor(
        userRepositorie: UserRepositorie,
        categorieService: CategorieService,
        achievementService: AchievementService,
        hashingService: HashingService,
        authService: AuthService
    ) {
        this.respositorie = userRepositorie
        this.categorieService = categorieService
        this.achivementService = achievementService
        this.hashingService = hashingService
        this.authService = authService
    }

    private respositorie: UserRepositorie
    private categorieService: CategorieService
    private achivementService: AchievementService
    private hashingService: HashingService
    private authService: AuthService

    async isUserEmailValid(email: string) {
        const result = await this.respositorie.count({
            where: {
                email: email
            }
        })
        return result == 0
    }

    isPasswordValid(password: string) {
        if (password.length < 4)
            return false
        if (!password.match(/[a-z]/))
            return false
        if (!password.match(/[A-Z]/))
            return false
        if (!password.match(/\d/))
            return false
        return true
    }

    private async formatNewUserToModel(data: any) {
        const userModel: INewUser = { ...data }
        userModel.password = await this.hashingService.hashPassword(data.password)
        userModel.categorie = await this.categorieService.getCategorie(data.categorie)
        return userModel
    }

    private async getUser(where: IFilterData[], relations?: UserRelations[]) {
        const params: FindOneOptions<User> = {}
        const whereParams: any = {}

        for (const { field, value } of where) {
            whereParams[field] = value
        }

        if (relations) {
            const data = []
            for (const relation of relations) {
                data.push(relation)
            }
            params.relations = data
        }

        params.where = whereParams

        return await this.respositorie.findOne(params)
    }

    private formatParcialUserData(user: User) {
        const token = this.authService.createToken({
            name: user.name,
            email: user.email
        })
        return {
            token: token,
            name: user.name,
            email: user.email,
            description: user.resume,
            categorie: user.categorie.name,
            occupation: user.occupation,
        }
    }

    async createUser(data: any) {
        try {
            const userFormattedModel = await this.formatNewUserToModel(data)
            const userModel = this.respositorie.create(userFormattedModel)
            const user = await this.respositorie.save(userModel);
            await this.achivementService.createAchievements(
                userModel.achievements,
                user
            )
            return this.formatParcialUserData(user)
        }
        catch (err) {
            console.log(err)
            return err
        }
    }

    async login(data: any) {
        const { email, password } = data

        const user = await this.getUser(
            [{ field: 'email', value: email }],
            [UserRelations.categorie]
        )

        if (user) {
            const isValidPassword = await this.hashingService.isValidPassword(password, user.password)
            if(!isValidPassword)
                return {}
            else
                return this.formatParcialUserData(user!)
        }
        return {}
    }

}