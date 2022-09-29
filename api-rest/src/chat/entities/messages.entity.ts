import User from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Messages {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
	created_at: Date;

    @Column({nullable: true})
    text: string

    @Column({nullable: true})
    fromUsername: string

    @Column({nullable: true})
    roomTag: string

    // @ManyToOne(() => Room, room => room.messages)
    // room:Rooms;

    @ManyToOne(() => User, user => user.messages)
    owner:User;
}
