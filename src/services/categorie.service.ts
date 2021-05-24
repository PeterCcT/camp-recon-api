import { FindOneOptions } from "typeorm"
import { Categorie } from "../models/categorie.model"
import { CategorieRepositorie } from "../repositories/categorie.repositorie"
import { isArrayEmpty } from "../utils/validators"

export class CategorieService {
    constructor(categorieRepositorie: CategorieRepositorie) {
        this.repositorie = categorieRepositorie
    }

    private repositorie: CategorieRepositorie

    async isCategorieValid(name: string) {
        const result = await this.repositorie.count({
            where: {
                name: name
            }
        })

        return result > 0
    }

    async getCategorie(name: string, returnFields?: (keyof Categorie)[]) {
        const searchObject: FindOneOptions<Categorie> = {
            where: {
                name: name
            }
        }
        if (isArrayEmpty(returnFields))
            searchObject.select = returnFields

        const categorie = await this.repositorie.findOne(searchObject)

        return categorie!

        // TODO: error validation
    }

    async getAllCategories() {
        try{
            const data = []
            const categories = await this.repositorie.find({ select: ['name'] })
            for (const categorie of categories) {
                data.push(categorie.name)
            }
            return data
        }catch(err){
            console.log(err)
            // TODO: error validation
        }
    }
}