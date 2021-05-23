import { link } from "fs";
import { Link } from "../models/link.model";
import { User } from "../models/user.model";
import { LinkRepositorie } from "../repositories/link.repositorie";

export class LinkService {

    constructor(linkRepositorie: LinkRepositorie) {
        this.respositorie = linkRepositorie
    }

    private respositorie: LinkRepositorie

    async createLinks(links: Link[], user: User) {
        for (const link of links) {
            link.user = user
            await this.respositorie.save(link)
        }
    }

    formatLink(link: Link) {
        return {
            'name': link.name,
            'url': link.url
        }
    }
}