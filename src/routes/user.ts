import { Router } from 'express'
import { getAuthMidlleware, getUserController, getUserValidator } from '../utils/class_factory'

const userRouter = Router()
const userController = getUserController()
const userValidator = getUserValidator()
const authMiddleware = getAuthMidlleware()

userRouter.post(
    '/user',
    (req, res, next) => userValidator.validateNewUser(req, res, next),
    (req, res) => userController.createUser(req, res)
)

userRouter.get(
    '/login',
    (req, res, next) => authMiddleware.checkToken(req, res, next),
    (req, res, next) => userValidator.validateLogin(req, res, next),
    (req, res) => userController.login(req, res),

)

export { userRouter }