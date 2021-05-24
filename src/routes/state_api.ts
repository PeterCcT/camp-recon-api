import { Router } from 'express'
import { getStateApiController } from '../utils/class_factory'

const statesRouter = Router()
const stateApiController = getStateApiController()

statesRouter.get(
    '/ufs',
    (req, res) => stateApiController.getAllUfs(req, res)
)

statesRouter.get(
    '/ufs/:uf',
    (req, res) => stateApiController.getAllCitiesFromUf(req, res)
)

export { statesRouter }