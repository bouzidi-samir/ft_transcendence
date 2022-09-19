import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm';
import { Status } from './status.entity';
import { Relatives } from './relatives.entity';
import { Room } from 'src/chat/entities/room.entity';
import { Messages } from '../../chat/entities/messages.entity';

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

	@Column({default: false})
	admin: boolean;

	@OneToMany(() => Room, (room) => room.user, {nullable: true})
	room:Room[];

	@OneToMany(() => Relatives, (relatives) => relatives.user, {nullable: true})
	relatives:Relatives[];

	@OneToMany(() => Messages, (messages) => messages.user, {nullable: true})
	messages:Messages[];

}