import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm';

@Entity()
export default class Game {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({nullable: true})
	p1_userName: string;

    @Column({nullable: true})
	p2_userName: string;

    @Column({ default : 0 })
	p1_score: number;

    @Column({ default:0 })
	p2_score: number;
}