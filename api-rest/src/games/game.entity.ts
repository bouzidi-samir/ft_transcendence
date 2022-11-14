import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm';

@Entity('game')
export default class Game {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
		type : 'text',
        default: 'No player1'
	})
	p1_userName: string;

    @Column({
		type : 'text',
        default: 'No player2'
	})
	p2_userName: string;

    @Column({
		type : 'integer',
        default: 0
	})
	p1_score: number;

    @Column({
		type : 'integer',
        default: 0
	})
	p2_score: number;

    @Column({
        default : 'No winner',
    })
    winner : string;
}