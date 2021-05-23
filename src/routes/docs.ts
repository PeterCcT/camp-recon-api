import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import { config } from '../config/openapi'
const docsRouter = Router()

docsRouter.use('/docs', swaggerUi.serve, swaggerUi.setup(config))

export { docsRouter }