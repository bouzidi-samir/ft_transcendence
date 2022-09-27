import User from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./room.entity";

@Entity()
export class Messages {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
	created_at: Date;

    @Column({nullable: true})
    text: string

    @Column({nullable: true})
    from: string

    @Column({nullable: true})
    to: string

    @ManyToOne(() => Room, room => room.messages)
    room:Room;

    @ManyToOne(() => User, user => user.messages)
    owner:User;
}
