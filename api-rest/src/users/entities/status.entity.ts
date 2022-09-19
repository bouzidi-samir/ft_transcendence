import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Relatives } from "./relatives.entity";
import User from "./user.entity";

@Entity()
export class Status {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: false})
    friend: boolean

    @Column({default: false})
    invited: boolean

    @Column({default: false})
    blocked: boolean

    @Column({default: false})
    muted: boolean

    @OneToOne(() => Relatives, (relatives) => relatives.status)
    relatives: Relatives;

}