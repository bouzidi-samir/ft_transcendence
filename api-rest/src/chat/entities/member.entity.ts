import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./room.entity";

@Entity()
export class Member {

    @PrimaryGeneratedColumn()
    memberId: number;

    @Column({nullable: true})
    userId: number;

    @Column({nullable: true})
    username: string;

    @Column({default: false})
    admin: boolean;

    @Column({default: false})
    in: boolean;

    @Column({default: false})
    out: boolean;

    @Column({default: false})
    blocked: boolean;

    @Column({nullable: true})
    roomTag: string;

    @Column({nullable: true})
    password:string;

}