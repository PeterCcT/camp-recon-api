import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.model";

@Entity()
export class Link {
    @PrimaryColumn({ generated: 'uuid', type: 'uuid', update: false })
    public id: string
    @Column({ nullable: false })
    public name: string
    @Column({ nullable: false })
    public url: string
    @ManyToOne(() => User, user => user.links)
    public user: User
}