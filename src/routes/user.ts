import { Router } from 'express'
import { getAuthMidlleware, getUserController, getUserValidator } from '../utils/class_factory'

const userRouter = Router()
const isProd = process.env.IS_PROD == 'true'
const userController = getUserController()
const userValidator = getUserValidator()
const authMiddleware = getAuthMidlleware()

if(!isProd){
    // Only release on PROD when image upload endpoint is ready
    userRouter.post(
        '/user',
        (req, res, next) => userValidator.validateNewUser(req, res, next),
        (req, res) => userController.createUser(req, res)
    )
}

userRouter.get(
    '/user',
    (req, res, next) => userValidator.validateGetUsersQuery(req, res, next),
    (req, res) => userController.getUsers(req, res)
)

userRouter.get(
    '/user/favorites',
    (req, res) => userController.getFavorites(req, res)

)

userRouter.get(
    '/user/:id',
    (req, res) => userController.getUser(req, res)
)


userRouter.post(
    '/login',
    (req, res, next) => userValidator.validateLogin(req, res, next),
    (req, res) => userController.login(req, res),
)



export { userRouter }