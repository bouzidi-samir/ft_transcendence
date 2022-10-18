import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Rooms } from "./rooms.entity";

@Entity()
export class Member {

    @PrimaryGeneratedColumn()
    memberId: number;

    @Column({nullable: true})
    userId: number;

    @Column({nullable: true})
    username: string;

    @Column({nullable: true})
    nickname: string;

    @Column({ type: 'varchar', default: 0 })
	avatar_url: string;

    @Column({default: false})
    owner: boolean;

    @Column({default: false})
    admin: boolean;

    @Column({default: false})
    in: boolean;

    @Column({default: false})
    out: boolean;

    @Column({default: false})
    blocked: boolean;

    @Column({default: false})
    muted: boolean;

    @Column({nullable: true})
    chronos: number

    @Column({nullable: true})
    roomTag: string;

    @Column({nullable: true})
    password:string;

    @ManyToOne(() => Rooms)
    @JoinColumn()
	room:Rooms;

}