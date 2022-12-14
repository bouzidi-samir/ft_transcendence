import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToMany} from 'typeorm';
import { Relations } from './relations.entity';
import { Messages } from '../../chat/entities/messages.entity';

@Entity('user')
export default class User {

	@PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: true })
    username: string;

	@Column({ type: 'varchar', default: ''})
    nickname: string;

	@Column({ nullable: true })
	public twoFactorAuthenticationSecret?: string;

	@Column({ default: false })
	public isTwoFactorAuthenticationEnabled: boolean;

	@Column({ default: false, nullable: true })
	public online: boolean;

	@Column({ default: false })
	public onGame: boolean;


	@Column({ type: 'varchar', unique: true , nullable: true})
	email: string;
	
	@Column({ type: 'varchar', default: 'false'})
    registred: string;

	@Column({ type: 'varchar', default: 0 })
	avatar_url: string;

	@Column({ type: 'varchar', default: 'Hors-Ligne'})
	status: string;

	@Column({ type: 'varchar', nullable: true })
	"42_token": string;

	@Column({ type : 'text', nullable: true })
	JWT_token: string;

	@Column({
		type: 'integer',
		default : 1200
	})
    ello: number;

	@Column({
		type: 'integer',
		default : 0
	})
    game_won: number;

	@Column({
		type: 'integer',
		default : 0
	})
    game_lost: number;

	@Column({
		type: 'integer',
		default : 0
	})
    game_played: number;

	// @Column("integer", { array: true, default: {} })
	// GamesPlayedId: number[];

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@OneToMany(() => Relations, (relations) => relations.owner, {nullable: true})
	@JoinColumn()
	relations:Relations[];

//	@OneToMany(() => Messages, (messages) => messages.owner, {nullable: true})
//	messages:Messages[];
}