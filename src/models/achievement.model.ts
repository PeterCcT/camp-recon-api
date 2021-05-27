import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.model";

export interface INewUserAchievement {
    name: string
    description: string
    date: Date
    image?: string
}

@Entity()
export class Achievement {
    @PrimaryColumn({ generated: 'uuid', type: 'uuid', update: false })
    public id: string
    @Column()
    public name: string
    @Column({ nullable: true })
    public description: string
    @Column()
    public date: Date
    @Column({ name: 'image_url', nullable: true })
    public imageUrl: string
    @ManyToOne(() => User, user => user.achievements)
    public user: User
}