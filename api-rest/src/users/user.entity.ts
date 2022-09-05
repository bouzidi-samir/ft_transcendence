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
		default: 'offline',
	})
    nickname: string;

	@Column({
		type: 'varchar',
		default: 'false',
	})
    registred: string;

	@Column({
		type: 'varchar',
		default: 0
	})
	avatar_url: string;

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

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

}