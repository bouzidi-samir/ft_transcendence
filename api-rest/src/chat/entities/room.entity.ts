import User from "../../users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Messages } from "./messages.entity";

@Entity()
export class Room {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tag: string;

    @Column({default: true})
    global: boolean;

    @Column({default: false})
    private: boolean;

    @Column({default: false})
    password:string;

    @OneToMany(() => User, (user) => user.room, {nullable: true})
    user:User[];

    @OneToMany( () => Messages, messages => messages.room, {nullable:true})
    @JoinColumn()
    messages:Messages[]

    
}