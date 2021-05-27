import { Request, Response, NextFunction } from 'express'
import * as yup from 'yup'
import { userFilterFields } from '../../models/user.model'
import { CategorieService } from '../../services/categorie.service'
import { UserService } from '../../services/user.service'

export class UserValidator {
    constructor(userService: UserService, categorieService: CategorieService) {
        this.service = userService
        this.categorieService = categorieService
    }

    private service: UserService
    private categorieService: CategorieService

    async validateNewUser(req: Request, res: Response, next: NextFunction) {
        const schema = yup.object().shape({
            name: yup.string()
                .min(3)
                .required(),
            email: yup.string()
                .required()
                .email()
                .test(
                    'is-valid-email',
                    'This email is already in use',
                    async email => await this.service.isUserEmailValid(email!)
                ),
            avatar: yup.string().notRequired(),
            password: yup.string()
                .required()
                .test(
                    'is-valid-password',
                    'The password should contains at least 4 chars,digits,upper and lower cases letters',
                    password => this.service.isPasswordValid(password!)
                ),
            age: yup.number()
                .integer()
                .positive()
                .required(),
            categorie: yup.string()
                .required()
                .test(
                    'is-categorie-existent',
                    'This categorie does not exist',
                    async categorie => await this.categorieService.isCategorieValid(categorie!)
                ),
            links: yup.array()
                .of(
                    yup.object().shape({
                        name: yup.string().required(),
                        url: yup.string().url().required()
                    })
                ).min(1).max(3).notRequired(),
            state: yup.string().required(),
            city: yup.string().required(),
            phone: yup.string().required(),
            occupation: yup.string().required(),
            description: yup.string().required(),
            achievements: yup.array()
                .of(
                    yup.object().shape({
                        name: yup.string().required(),
                        description: yup.string().notRequired(),
                        date: yup.date().required(),
                        imageUrl: yup.string().min(1).notRequired()
                    })
                ).min(1).notRequired(),
            galleryImages: yup.array()
                .min(1)
                .of(
                    yup.string().min(1)
                ).notRequired()
        })
        const { body } = req
        schema.validate(body).then(() => next()).catch(err => {
            const { path, type, errors, params, message } = err
            return res.status(400).send({
                'type': type,
                'message': message,
                'param': path
            })
        })
    }

    validateLogin(req: Request, res: Response, next: NextFunction) {
        const schema = yup.object().shape({
            email: yup.string().email().required(),
            password: yup.string().required()
        })
        const { body } = req
        schema.validate(body).then(() => next()).catch(err => {
            const { path, type, errors, params, message } = err
            return res.status(400).send({
                'type': type,
                'message': message,
                'param': path
            })
        })
    }

    async validateGetUsersQuery(req: Request, res: Response, next: NextFunction) {
        const { query } = req
        const validKeys = [
            'page',
            'limit',
            ...userFilterFields,
        ]
        if (query) {
            const filterKeys = Object.keys(query)
            const containsPageFilter = filterKeys.includes('page')
            const containsLimitFilter = filterKeys.includes('limit')

            if (containsPageFilter && !containsLimitFilter) {
                return res.status(400).send({
                    'type': 'MissingValueError',
                    'message': 'The query param "page" depends on "limit" query param',
                    "param": "page"
                })
            }

            const page = Number(query['page'])
            const limit = Number(query['limit'])

            if (page <= 0 && containsPageFilter) {
                return res.status(400).send({
                    'type': 'ValueError',
                    'message': 'The query param "page" should be greater than 0',
                    "param": "page"
                })
            } else if (limit <= 0 && containsLimitFilter) {
                return res.status(400).send({
                    'type': 'ValueError',
                    'message': 'The query param "limit" should be greater than 0',
                    "param": "limit"
                })
            } else {
                for (const filterKey of filterKeys) {
                    if (filterKey === 'categorie') {
                        const isValidCategorie = await this.categorieService.isCategorieValid(query[filterKey] as string)
                        if (!isValidCategorie) {
                            return res.status(400).send({
                                'type': 'ValueError',
                                'message': `The value of query param "categorie" does not match any categorie disponible`,
                                "param": filterKey
                            })
                        }
                    }

                    if (!validKeys.includes(filterKey)) {
                        return res.status(400).send({
                            'type': 'ValueError',
                            'message': `The query param "${filterKey}" does not match any of ther disponible filters`,
                            "param": filterKey
                        })
                    }
                }
                return next()
            }
        }
        else {
            return next()
        }
    }

}
