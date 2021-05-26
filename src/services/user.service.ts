import { FindManyOptions, FindOneOptions, ILike, Like } from "typeorm";
import { DefaultError } from "../errors/errors";
import { INewUser, User, UserRelations } from "../models/user.model";
import { UserRepositorie } from "../repositories/user.repositorie";
import { isArrayEmpty } from "../utils/validators";
import { AchievementService } from "./achievement.service";
import { AuthService } from "./auth.service";
import { CategorieService } from "./categorie.service";
import { GalleryImageService } from "./gallery.service";
import { HashingService } from "./hashing.service";
import { LinkService } from "./link.service";

interface IFilterData {
    field: (keyof User),
    value: string
}

interface DefaultReturn {
    containsError: boolean
    err: any
}

interface OneUserReturn extends DefaultReturn {
    user: User | undefined
}

interface ListOfUserReturn extends DefaultReturn {
    users: User[] | undefined
}


interface SanitizedQueryFilters {
    paginationInfo?: {
        limit: number
        skipNumber?: number
    },
    filtersInfo?: {
        name?: string
        age?: string
        state?: string
        city?: string
        occupation?: string
        categorie?: { name: string }
    }
}

export class UserService {

    constructor(
        userRepositorie: UserRepositorie,
        categorieService: CategorieService,
        achievementService: AchievementService,
        galleryImageService: GalleryImageService,
        linkService: LinkService,
        hashingService: HashingService,
        authService: AuthService
    ) {
        this.respositorie = userRepositorie
        this.categorieService = categorieService
        this.achivementService = achievementService
        this.galleryImageService = galleryImageService
        this.hashingService = hashingService
        this.authService = authService
        this.linkService = linkService
    }

    private respositorie: UserRepositorie
    private categorieService: CategorieService
    private achivementService: AchievementService
    private galleryImageService: GalleryImageService
    private hashingService: HashingService
    private authService: AuthService
    private linkService: LinkService

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
        // TODO: error validation
        const userModel: INewUser = { ...data }
        userModel.password = await this.hashingService.hashPassword(data.password)
        userModel.categorie = await this.categorieService.getCategorie(data.categorie)
        return userModel
    }

    private async getUser(where: IFilterData[], relations?: UserRelations[]) {
        try {
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

        } catch (err) {
            console.log(err)
            return undefined
        }
    }

    private formatParcialUserData(user: User, isToGenerateToken: boolean = true) {
        const data: any = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            categorie: user.categorie.name,
            city: user.city,
            state: user.state,
            occupation: user.occupation,
        }
        if (isToGenerateToken) {
            const token = this.authService.createToken({
                name: user.name,
                email: user.email
            })
            data['token'] = token
        }
        return data
    }


    private formatFullUserData(user: User) {
        const formattedUser = this.formatParcialUserData(user)
        formattedUser['links'] = user.links?.map(link => this.linkService.formatLink(link)) ?? []
        formattedUser['achievements'] =  this.achivementService.sortAchivements(user.achievements) ?? []
        formattedUser['imageGallery'] = this.galleryImageService.sortGalleryImages(user.galleryImages) ?? []

        return formattedUser
    }

    async createUser(data: any): Promise<OneUserReturn> {
        const result: OneUserReturn = {
            containsError: false,
            user: undefined,
            err: undefined
        }
        try {
            const userFormattedModel = await this.formatNewUserToModel(data)
            const userModel = this.respositorie.create(userFormattedModel)
            const user = await this.respositorie.save(userModel);
            if (!isArrayEmpty(userModel.achievements)) {
                await this.achivementService.createAchievements(
                    userModel.achievements,
                    user
                )
            }
            if (!isArrayEmpty(user.links)) {
                await this.linkService.createLinks(userModel.links, user)
            }
            result.user = this.formatParcialUserData(user)
            return result
        }
        catch (err) {
            result.containsError = true
            result.err = new DefaultError(500, '...', 'Unexpected error', 'UnexpectedError')
            return result
        }
    }

    async login(data: any): Promise<OneUserReturn> {
        const result: OneUserReturn = {
            containsError: false,
            user: undefined,
            err: undefined
        }
        try {

            const { email, password } = data

            const user = await this.getUser(
                [{ field: 'email', value: email }],
                [UserRelations.categorie]
            )

            if (user) {
                const isValidPassword = await this.hashingService.isValidPassword(password, user.password)
                if (!isValidPassword) {
                    result.containsError = true
                    result.err = new DefaultError(400, 'password', 'Invalid password', 'ValueError')
                    return result
                }
                else {
                    const formattedUser = this.formatParcialUserData(user!, true)
                    result.user = formattedUser
                    return result
                }
            }
            result.containsError = true
            result.err = new DefaultError(400, 'email', 'Invalid email, user not founded', 'ValueError')
            return result
        } catch (err) {
            console.log(err)
            result.containsError = true
            result.err = new DefaultError(500, '...', 'Unexpected Error', 'UnexpectedError')
            return result
        }
    }

    async getOneUser(id: string): Promise<OneUserReturn> {
        const result: OneUserReturn = {
            containsError: false,
            user: undefined,
            err: undefined
        }
        try {
            const user = await this.getUser([{
                field: 'id',
                value: id
            }], [
                UserRelations.achievements,
                UserRelations.categorie,
                UserRelations.links,
                UserRelations.galleryImages
            ])
            if (user) {
                result.user = this.formatFullUserData(user)
                return result
            }
            result.containsError = true
            result.err = new DefaultError(400, '...', 'User not founded', 'ValueError')
            return result
        } catch (err) {
            console.log(err)
            result.containsError = true
            result.err = new DefaultError(500, '...', 'Internal error', 'UnexpectedError')
            return result
        }
    }

    async getUsers(filters: any): Promise<ListOfUserReturn> {
        const result: ListOfUserReturn = {
            containsError: false,
            users: [],
            err: undefined
        }
        try {
            if (filters) {
                const options: FindManyOptions<User> = {
                    relations: ['categorie'],
                    order: {
                        name: 'ASC'
                    },
                }
                const {
                    paginationInfo,
                    filtersInfo
                } = this._sanitizeQueryFilters(filters)


                if (paginationInfo) {
                    options.take = paginationInfo.limit
                    if (paginationInfo.skipNumber) {
                        options.skip = paginationInfo.skipNumber
                    }
                }
                if (filtersInfo) {
                    options.where = { ...filtersInfo }
                }

                const users = await this.respositorie.find(options)
                if (!isArrayEmpty(users)) {
                    result.users = users.map(user => this.formatParcialUserData(user, false))
                    return result
                }
                return result
            } else {
                const users = await this.respositorie.find()
                if (!isArrayEmpty(users)) {
                    result.users = users.map(user => this.formatParcialUserData(user, false))
                    return result
                }
                return result

            }
        } catch (err) {
            console.log(err)
            result.containsError = true
            result.err = new DefaultError(500, '...', 'Internal error', 'UnexpectedError')
            return result
        }
    }

    private _sanitizeQueryFilters(filters: any): SanitizedQueryFilters {
        const sanitizedFilters: SanitizedQueryFilters = {
            paginationInfo: undefined,
            filtersInfo: undefined
        }

        const paginationInfo: any = {}
        const filtersInfo: any = {}

        const page = filters['page']
        const limit = filters['limit']

        if (limit) {
            paginationInfo['limit'] = Number(limit)
            if (page) {
                paginationInfo['skipNumber'] = (page - 1) * limit
            }
        }

        const queryFiltersKeys = Object.keys(filters)
        for (const filter of queryFiltersKeys) {
            if (filter !== 'page' && filter !== 'limit') {
                const currentFilterValue = filters[filter]
                if (filter === 'categorie') {
                    filtersInfo[filter] = {
                        name: currentFilterValue
                    }
                } else if (filter === 'occupation') {
                    filtersInfo[filter] = ILike(`%${currentFilterValue}%`)
                } else if (filter === 'name') {
                    filtersInfo[filter] = ILike(`${currentFilterValue}%`)
                }
            }
        }

        sanitizedFilters.paginationInfo = paginationInfo
        sanitizedFilters.filtersInfo = filtersInfo

        return sanitizedFilters

    }

    async getFavorites(): Promise<ListOfUserReturn> {
        const result: ListOfUserReturn = {
            containsError: false,
            users: undefined,
            err: undefined
        }
        try {
            const users = await this.respositorie.find({ take: 4 })
            result.users = users.map(user => this.formatParcialUserData(user))
            return result
        } catch (err) {
            console.log(err)
            result.containsError = true
            result.err = new DefaultError(500, '...', 'Internal error', 'UnexpectedError')
            return result
        }
    }

}