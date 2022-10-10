import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./user.entity";

@Entity()
export class Relations {

    @PrimaryGeneratedColumn()
    relationId: number;

    @Column()
    fromUsername: string;

    @Column()
    toUsername: string;

    @Column({default: false})
    friendshipRequest: boolean

    @Column({default: false})
    acceptFriendship: boolean

    @Column({default: false})
    roomRequest: boolean

    @Column({default: false})
    acceptRoom: boolean

    @Column({nullable: true})
    roomTag: string

    @Column({default: false})
    gameRequest: boolean

    @Column({default: false})
    acceptGame: boolean

    // @Column({nullable: true})
    // gameId: number

    @Column({default: false})
    blocked: boolean

    @Column({default: false})
    muted: boolean

    @ManyToOne(() => User, (user) => user.relations, {nullable: true, eager: true})
    owner: User;

}