import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "./status.entity";
import User from "./user.entity";

@Entity()
export class Relatives {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => User, (user) => user.relatives)
    user: User;

    @OneToOne(() => Status, (status) => status.relatives)
    @JoinColumn()
    status:Status;
}