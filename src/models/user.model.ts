import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Categorie } from "./categorie.model";
import { Achievement } from "./achievement.model";
import { GalleryImage } from "./image_gallery.model";
import { Link } from "./link.model";

export interface INewUser {
    name: string
    email: string
    password: string
    age: number
    phone: string
    state: string
    city: string
    occupation: string
    description: string
    categorie: Categorie
    links?: Link[]
    achievements?: Achievement[]
    galleryImages?: GalleryImage[]
}

export enum UserRelations {
    categorie = 'categorie',
    achievements = 'achievements',
    galleryImages = 'galleryImages',
    links = 'links'
}

export const userFilterFields = [
    'name',
    'age',
    'state',
    'city',
    'occupation',
    'categorie'
]

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
    public description: string
    @Column()
    public avatar: string
    @ManyToOne(() => Categorie, categorie => categorie.users)
    @JoinColumn({ name: 'categorie', referencedColumnName: 'name' })
    public categorie: Categorie
    @OneToMany(() => Link, link => link.user)
    public links: Link[]
    @OneToMany(() => Achievement, achievement => achievement.user, { nullable: true })
    public achievements: Achievement[]
    @OneToMany(() => GalleryImage, galleryImage => galleryImage.user, { nullable: true })
    public galleryImages: GalleryImage[]

}