import { EntityRepository, Repository } from "typeorm";
import { Link } from "../models/link.model";
@EntityRepository(Link)
export class LinkRepositorie extends Repository<Link>{ }