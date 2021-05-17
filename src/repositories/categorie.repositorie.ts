import { EntityRepository, Repository } from "typeorm";
import { Categorie } from "../models/categorie.model";
@EntityRepository(Categorie)
export class CategorieRepositorie extends Repository<Categorie>{ }