import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.model";


@Entity()
export class GalleryImage {
    @PrimaryColumn({ generated: 'uuid', type: 'uuid', update: false })
    public id: string
    @Column()
    public url: string
    @CreateDateColumn({ name: 'upload_date' })
    public uploadDate: Date
    @ManyToOne(() => User, user => user.galleryImages)
    public user: User

}