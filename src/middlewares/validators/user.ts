import { Request, Response, NextFunction } from 'express'
import * as yup from 'yup'
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
            name: yup.string().required(),
            email: yup.string()
                .required()
                .email()
                .test(
                    'is-valid-email',
                    'This email is already in use',
                    async email => await this.service.isUserEmailValid(email!)
                ),
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
            state: yup.string().required(),
            city: yup.string().required(),
            phone: yup.string().required(),
            occupation: yup.string().required(),
            resume: yup.string().required(),
            achievements: yup.array()
                .of(
                    yup.object().shape({
                        name: yup.string().required(),
                        description: yup.string().required(),
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
                'path': path,
                'params': params,
                'errors': errors
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
                'path': path,
                'params': params,
                'errors': errors
            })
        })
    }

}
