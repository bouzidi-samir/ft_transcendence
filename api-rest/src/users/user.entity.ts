import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm';

@Entity('user')
export default class User {

	@PrimaryGeneratedColumn()
    id: number;

    @Column({
		type: 'varchar'
	})
    username: string;

	@Column({
		type: 'varchar',
		unique: true,
	})
	"42_username": string;

	@Column({
		type: 'int',
		default: 0
	})
	avatar_id: number;

	@Column({
		type: 'varchar',
		default: '#ffffff',
		nullable: false
	})
	color_paddle: string;

	@Column({
		type: 'varchar',
		default: '#BB86FC',
		nullable: false
	})
	color_ball: string;

	@Column({
		type: 'varchar',
		default: 'offline',
	})
	status: string;

	@Column({
		type: 'varchar',
		nullable: true
	})
	"42_token": string;

	@Column({
		type: 'boolean',
		default: false
	})
	"2FA_status": boolean;

	@Column({
		type: 'varchar',
		default: '',
	})
	"2FA_secret": string;

	@Column({
		type: 'int',
		default: 1000
	})
	ELO_score: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}