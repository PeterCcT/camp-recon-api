import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Categorie } from "./categorie.model";
import { Achievement } from "./achievement.model";
import { GalleryImage } from "./image_gallery.model";

export interface INewUser {
    name: string
    email: string
    password: string
    age: number
    phone: string
    state: string
    city: string
    occupation: string
    resume: string
    categorie: Categorie
    achievements?: Achievement[]
    galleryImages?: GalleryImage[]
}

export enum UserRelations {
    categorie='categorie',
    achievements='achievements',
    galleryImages='galleryImages'
}

@Entity()
export class User {
    @PrimaryColumn({ generated: 'uuid', type: 'uuid', update: false })
    public id: string
    @Column()
    public name: string
    @Column({ unique: true })
    public email: string
    @Column()
    public password: string
    @Column({ type: 'int' })
    public age: number
    @Column()
    public phone: string
    @Column()
    public state: string
    @Column()
    public city: string
    @Column()
    public occupation: string
    @Column()
    public resume: string
    @ManyToOne(() => Categorie, categorie => categorie.users)
    public categorie: Categorie
    @OneToMany(() => Achievement, achievement => achievement.user, { nullable: true })
    public achievements: Achievement[]
    @OneToMany(() => GalleryImage, galleryImage => galleryImage.user, { nullable: true })
    public galleryImages: GalleryImage[]

}