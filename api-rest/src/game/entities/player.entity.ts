import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Game  from "./game.entity";

@Entity()
export class Player {

    @PrimaryGeneratedColumn()
    playerId: number;

    @Column({nullable: true})
    userId: number;

    @Column({nullable: true})
    username: string;

    @Column({nullable: true})
    nickname: string;

    @Column({default: false})
    winner: boolean;

    @Column({default: false})
    looser: boolean;

    @ManyToOne(() => Game)
    @JoinColumn()
	game:Game;

}