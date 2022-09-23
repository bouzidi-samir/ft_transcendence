import User from "../../users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./room.entity";

@Entity()
export class Messages {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string

    // @ManyToOne(() => Room, room => room.messages)
    // room:Room;

    @ManyToOne(() => User, user => user.messages)
    user:User;
}
