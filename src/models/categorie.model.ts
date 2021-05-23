import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "./user.model";

export interface INewUserCategorie {
    name: string
}

@Entity()
export class Categorie {
    @PrimaryColumn({ generated: 'uuid', type: 'uuid', update: false })
    public id: string
    @Column({ nullable: false, unique: true })
    public name: string
    @OneToMany(() => User, user => user.categorie)
    public users: User[]
}