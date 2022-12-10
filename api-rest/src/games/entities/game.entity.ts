import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm';

@Entity('games')
export default class Games {

    @PrimaryGeneratedColumn()
    id: number;

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
		type : 'integer',
        default: 0
	})
	p1_id: number;

    @Column({
		type : 'integer',
        default: 0
	})
	p2_id: number;

    @Column({
		type : 'varchar',
        default: 'null',
	})
	p1_nick: string;

    @Column({
		type : 'varchar',
        default: 'null',
	})
	p2_nick: string;

    @Column({
        default : 0,
    })
    winner : number;
}