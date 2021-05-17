import { Router } from 'express'
import { getAuthMidlleware, getCategorieController, getCategorieService } from '../utils/class_factory'

const categoriesRouter = Router()
const categorieController = getCategorieController()

categoriesRouter.get(
    '/categories',
    (req, res) => categorieController.getAllCategories(req, res)
)

export { categoriesRouter }