import { Request, Response } from "express";
import { CategorieService } from "../services/categorie.service";

export class CategorieController {
    constructor(categorieService: CategorieService) {
        this.service = categorieService
    }

    private service: CategorieService

    async getAllCategories(req: Request, res: Response) {
        const categories = await this.service.getAllCategories()
        res.send(categories)
    }
}